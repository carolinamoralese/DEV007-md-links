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



describe("routeExists", () => {
  it("deberia ser una funcion", () => {
    expect(typeof routeExists).toBe("function");
  });

  it('deberia retorna true si la ruta no existe', async() => {
    expect(routeExists('./test/prueba1/archivo1.md')).toBe(true)
  })

  it('deberia retorna false si la ruta no existe', async() => {
    expect(routeExists('./test/prueb/archivo1.md')).toBe(false)
  })
});


describe("routeAbsolute", () => {
  it("retorna la ruta absoluta",async() => {
    const archivo = '/Users/usuario/Documents/laboratoria/DEV007-md-links/test/prueba1/archivo1.md'
    expect(routeAbsolute('./test/prueba1/archivo1.md')).toEqual(archivo)
  });

  it("retorna la misma ruta si esta ya es absoluta",async() => {
    const archivo = '/Users/usuario/Documents/laboratoria/DEV007-md-links/test/prueba1/archivo1.md'
    expect(routeAbsolute(archivo)).toEqual(archivo)
  });
  
});

describe("fileOrDir", () => {
  it("deberia decir true si es un archivo",async () => {
    const archivo = './test/prueba1/archivo1.md'
    const result = fileOrDir(archivo)
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toBe(archivo);
  })
})