import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';

export default async ({expressApp}) => {

    const mongoConnection = await mongooseLoader();
    console.log('->    DB Loaded and Connected');

    await expressLoader({ app: expressApp });
    console.log('->    Express Loaded');

    const csmiModel = {
        name: 'csmiModel',
        model: require('../models/csmi').default,
    };

    const { agenda } = await dependencyInjectorLoader({
        mongoConnection,
        models: [
          csmiModel,
        ],
    });

    console.log('->    Dependency Injector Loaded');
}