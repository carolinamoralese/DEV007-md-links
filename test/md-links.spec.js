import {
  routeExists,
  routeAbsolute,
  fileOrDir,
  getMdExtension,
  processFile,
  getLinks,
  checkLinks,
  peticionHTTP,
  getStatsFromLinks,
} from "../index.js";

import path from "path";

describe("routeExists", () => {
  it("deberia ser una funcion", () => {
    expect(typeof routeExists).toBe("function");
  });

  it("deberia retorna true si la ruta no existe", async () => {
    expect(routeExists("./test/prueba1/archivo1.md")).toBe(true);
  });

  it("deberia retorna false si la ruta no existe", async () => {
    expect(routeExists("./test/prueb/archivo1.md")).toBe(false);
  });
});

describe("routeAbsolute", () => {
  it("retorna la ruta absoluta", async () => {
    const archivo = path.resolve("./test/prueba1/archivo1.md");
    expect(routeAbsolute("./test/prueba1/archivo1.md")).toEqual(archivo);
  });
  it("no hace nada porque ya es una ruta absoluta", async () => {
    const archivo = path.resolve("./test/prueba1/archivo1.md");
    expect(routeAbsolute(archivo)).toEqual(archivo);
  });
});

describe("fileOrDir", () => {
  it("deberia decir true si es un archivo", async () => {
    const archivo = "./test/prueba1/archivo1.md";
    const result = fileOrDir(archivo);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toBe(archivo);
  });
});

describe("getMdExtension", () => {
  it("recibe array con archivos y retorna un array con archivos .md ", async () => {
    const archivos = [
      "test/md-links.spec.js",
      "test/prueba1/archivo1.md",
      "test/prueba2/archivo3.md",
      "test/prueba2/prueba3/archivo1.doc",
    ];
    const result = ["test/prueba1/archivo1.md", "test/prueba2/archivo3.md"];
    expect(getMdExtension(archivos)).toStrictEqual(result);
  });
});

describe("processFile", () => {
  it("should read the contents of all files", async () => {
    const arrayFiles = ["test/prueba1/archivo1.md"];
    const expectedResults = [
      "hola, soy una prueba\n" +
        "[Markdown](https://es.wikipedia.org/wiki/Markdown)\n" +
        "[Arreglos](https://curriculum.laboratoria.la/es/topics/javascript/04-arrays)\n" +
        "[Arreglos2](https://www.cyberclick.es/numerical-blog/arquitectura-de-url-para-seo-como-construir-silos-parka-los-buscadores)\n" +
        "[Arreglos2](https://www.cyberclick.es/numerical-blog/arquitectura-de-url-para-seo-como-construir-silos-parka-los-buscadores)\n" +
        "no me puede leer porque no sou un link",
    ];

    const actualResults = await processFile(arrayFiles);
    expect(actualResults).toEqual(expectedResults);
  });
});

describe("getLinks", () => {
  it("retorna un array con los links de un archivo", async () => {
    const archivos = [
      "hola, soy una prueba\n" +
        "[Markdown](https://es.wikipedia.org/wiki/Markdown)\n",
    ];

    const result = ["[Markdown](https://es.wikipedia.org/wiki/Markdown)"];

    expect(getLinks(archivos)).toStrictEqual(result);
  });
});

describe("checkLinks", () => {
  it("deberia retorna un array con los links validados", async () => {
    const archivos = ["[Markdown](https://es.wikipedia.org/wiki/Markdown)"];

    const result = [
      {
        href: "https://es.wikipedia.org/wiki/Markdown",
        text: "Markdown",
        file: "/Users/usuario/Documents/laboratoria/DEV007-md-links",
      },
    ];
    expect(checkLinks(archivos)).toStrictEqual(result);
  });
});

describe("getStatsFromLinks", () => {
  it("deberia retorna --stats sin --valdiate", async () => {
    const arrObjs = [
      { href: "https://es.wikipedia.org/wiki/Markdown", mensaje: "OK" },
      {
        href: "https://curriculum.laboratoria.la/es/topics/javascript/04-arrays",
        mensaje: "OK",
      },
      { href: "https://jestjs.io/docs/es-ES/manual-mocks", mensaje: "OK" },
    ];
    const isOptionValidate = false;
    const expectedStats = {
      total: 3,
      unique: 3,
    };

    const actualStats = await getStatsFromLinks(arrObjs, isOptionValidate);
    expect(actualStats).toEqual(expectedStats);
  });

  it("deberia retorna --stats con --valdiate", async () => {
    const arrObjs = [
      { href: "https://es.wikipedia.org/wiki/Markdown", mensaje: "OK" },
      {
        href: "https://www.cyberclick.es/numerical-blog/arquitectura-de-url-para-seo-como-construir-silos-parka-los-buscadores",
        mensaje: "Fail",
      },
      {
        href: "https://curriculum.laboratoria.la/es/topics/javascript/04-arrays",
        mensaje: "OK",
      },
      { href: "https://jestjs.io/docs/es-ES/manual-mocks", mensaje: "OK" },
    ];
    const isOptionValidate = true;
    const expectedStats = {
      total: 4,
      unique: 4,
      working: 3,
      broken: 1,
    };

    const actualStats = await getStatsFromLinks(arrObjs, isOptionValidate);
    expect(actualStats).toEqual(expectedStats);
  });
});

describe("peticionHTTP", () => {
  it("Es una función", () => {
    expect(typeof peticionHTTP).toBe("function");
  });
  it("should return a Promise of an array of objects", async () => {
    const url = [{ href: "https://www.google.com" }];
    const results = await peticionHTTP(url).then((result) => result);
    expect(results).toEqual([
      { href: "https://www.google.com", status: 200, mensaje: "OK" },
    ]);
  });
});

it("Debería arrojar error", async () => {
  const url = [
    { href: "https://www.google.com" },
    { href: "https://www.example.com/404" },
  ];
  const results = await peticionHTTP(url);
  expect(results[0].status).toBe(200);
  expect(results[0].mensaje).toBe("OK");
  expect(results[1].status).toBe(404);
  expect(results[1].mensaje).toBe("Fail");
});
