export type TrainingBody = {
  id?: number;
  diaSemana: number;
  musculo: number;
  serie?: Array<object>;
  usuario?: number;
};

export type ExerciseBody = {
  idTreino: number;
  idSubTipoTreino: number;
  serie: Array<object>;
};
