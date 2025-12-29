export const previsaoEolicaService = {
  getPrevisao: async (dataPdp: string) => {
    await new Promise((r) => setTimeout(r, 400));
    return {
      dataPdp,
      parques: [
        { cod: 'PEO001', nome: 'Parque 1', previsaoMW: 30 },
        { cod: 'PEO002', nome: 'Parque 2', previsaoMW: 45 },
      ],
    };
  },

  savePrevisao: async (payload: any) => {
    await new Promise((r) => setTimeout(r, 500));
    console.log('Saved previsao eolica', payload);
  },
};
