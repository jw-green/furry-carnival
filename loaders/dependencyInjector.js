import { Container } from 'typedi';

import agendaFactory from './agenda';

export default ({ mongoConnection, models }) => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
    });

    const agendaInstance = agendaFactory({ mongoConnection });

    Container.set('agendaInstance', agendaInstance);

    return { agenda: agendaInstance };
  } catch (e) {
    console.log('🔥 Error on dependency injector loader %o', e);
    throw e;
  }
};