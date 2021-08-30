import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';

export default async ({expressApp}) => {

    const mongoConnection = await mongooseLoader();
    console.log('->    DB Loaded and Connected');

    await expressLoader({ app: expressApp });
    console.log('->    Express Loaded');

    // Example Model
    // =====================================================
    // const ContactsModel = {
    //     name: 'ContactsModel',
    //     model: require('../models/Contacts').default,
    // };

    const { agenda } = await dependencyInjectorLoader({
        mongoConnection,
        models: [
            
        // Example
        // =================================================
        //   ContactsModel,
        ],
    });

    console.log('->    Dependency Injector Loaded');
}