const states = {
  inProgress: 0,
  completed: 1,
}

export function textifyState(state) {
  if (state === states.inProgress) {
    return 'Еще считаем...'
  }
  return 'Уже рассчитались!'
}

export default states;
