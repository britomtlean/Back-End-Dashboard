export type ReqTraining = {
  id?: number;
  diaSemana: number;
  musculo: number;
  serie?: Array<object>;
  usuario?: number;
};

export type ReqExercise = {
  idTreino: number;
  idSubTipoTreino: number;
  serie: Array<object>;
};
