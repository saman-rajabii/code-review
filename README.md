## Code review Project



The following content shows us how this project prepared to go production.
To see the original structure before any changes, switch to `original` branch.

### Problems and solutions

1- _Modularity_, the first and most important thing that catches the eyes is that, the project isn't modular.
As you know it is a bad practice, especially about those projects which become grow over time
It is the main reason of chaos in the source code and makes difficult to maintain in the future.
Layering structure comes to help us in this scope (i describe the new structure in the next section)

2- _Redundancy_, there were several redundancies that increase the complexity of code such as database connection definition or routing version that are eliminated with the help of modularity.

3- _Security_, before change, there was no validation in the system.All of the inputs came without validity checking and definitely it wasn't secure.
By adding validation middleware on each route, i solved security concern in this scope.

4- _Logs_, there were multiple logs within the source code that crowded the code and i organized them by adding logger manager.

5- _Response formats_, the APIs responses were not in the right format, and most likely, the other side of team such as frontend would face messy response structures. Obviously, in this case, development will be difficult.
So I made right format for all responses within the system.

6- _Error handling_, the last thing that had not considered in the code was the error handler.
I added handlers to make fault tolerance within the code.

### What i did, in details

1- New structure

    ├── src
    │   ├── controllers
    │   │   ├── index.ts
    │   │   ├── favorite.controller.ts
    │   │   ├── profile.controller.ts
    │   │   ├── simulator.controller.ts
    │   ├── services
    │   │   ├── index.ts
    │   │   ├── favorite.service.ts
    │   │   ├── profile.service.ts
    │   │   ├── simulator.service.ts
    │   ├── routes
    │   │   ├── index.ts
    │   │   ├── favorite.router.ts
    │   │   ├── profile.router.ts
    │   │   ├── simulator.router.ts
    │   ├── models
    │   │   ├── index.ts
    │   │   ├── Favorite.ts
    │   │   ├── Profile.ts
    │   │   ├── Simulator.ts
    │   ├── validations
    │   │   ├── index.ts
    │   │   ├── favorite.validation.ts
    │   │   ├── profile.validation.ts
    │   │   ├── simulator.validation.ts
    │   ├── middlewares
    │   │   ├── errorHandler.middleware.ts
    │   │   ├── index.ts
    │   ├── libs
    │   │   ├── logger.ts
    │   │   ├── index.ts
    │   ├── enums
    │   │   ├── index.ts
    │   ├── scripts
    │   │   ├── seed.ts
    │   ├── api.ts
    │   ├── config.ts
    ├── dist
    ├── node_modules
    ├── package.json
    ├── package-lock.json
    ├── .gitignore
    ├── dockerfile
    └── docker-compose.yml

As you can see, the project divided to different layers:

`rourers → controllers → services → models`

All of the layers follow the same structure, each one has their own directory and whithin that, there is an **index** file that organizes import/export the module to the other part of code.
apart from the main modules, there are some modules that used as an helper such as **libs** and **enums**.
Each layer seperated and has their own dependencies and requirements and scoped than the other layers.
It causes we detect specific part of code easily and also fixing the bugs quickly.

Layers respectively:

- **Routers**: This layer is responsible for providing routing and directing the incoming requests to the controller layer
- **Controllers**: This layer accepts the request from routers layer and it is responsible to do bussines logic
- **Services**: This layer accepts calls from the controller layer to perform data logic on the models
- **Models**: This layer is responsible for interacting with the database to perform the transactions
- **Middlewares**: This layer provides middlewares which are located at the beginning and at the end of the requests path to do manipulation and checking on the requests.
- **Validations**: this layer validates incoming data in the requests before reching the controller

2- I changed routing name from singular to plural to follow routes best practice convention eg `profile/` → `profiles/`.
I also added the route version in the first layer of the routes module so that I can change or add another version in one place whenever needed. `app.use("/api/v1", routes);`

3- I added pagination on get all routes to handle the range of data in their responses.

4- I moved `get profile's simulators` and `get profile's favorites` API to profile router module, because both of them related to profile scope

5- I assigned interface structure to each mongodb model to clarify what their data format is.
It helps to manipulate and access to the related data's properties through editor inteligence (i'm using vscode)

look at the following example:

```typescript
interface IFavorite extends mongoose.Document {
  profile_id: mongoose.Types.ObjectId;
  name: string;
  favorites: string[];
}

//export
export default mongoose.model<IFavorite>("Favorite", schema);
```

6- To address validating inputs, i added `express-validation` package which configured and worked as a middleware on each route to validate passed data within request's body, params and query.
In addition used from `joi` package to check structure of data within valiadators.

look at the following example :

```typescript
const createSimulatorValidation = validate(
  {
    body: joi.object({
      profile_id: joi.objectId().required(),
      dateRecorded: joi.date().required(),
      cryptocurrency: joi.string().required(),
      euros: joi.number().positive().required(),
      price: joi.number().positive().required(),
      quantity: joi.number().positive().required(),
    }),
  },
  { keyByField: true }
);
```

7- To organize the logs over the project, i made a logger based on `winston` package.
The logger provides two log type **info** and **error**.
I used them instead of `console.log()` in the source code.

logger structure and usage:

```typescript
// logger module

...
function logInfo(message: string, meta: any = {}) {
  logger.log("info", message, { detail: JSON.stringify(meta) });
}

function logError(message: string, error: Error) {
  logger.log("error", message, { error });
}
...

// usage
logger.logInfo(`Mongodb Connection was successful`);
```

**Note**: The logger also can be integrated with the other tools such as elasticsearch inorder to store logs there, but to keep simplicity we used `winston.transports.Console()`.

8- Over the project, i added response format where return response nedded:
There are two types of response as follows:
For successful result: `{ data: {} }` and for error result: `{ message: "...", error: {} | [] | void }`

9- Error handling, the missing part in the project!
I added `try catch` block in all of the controllers logic, to increase fault tolerance, in addition handled some errors within the codes and prepared approperiate response for them.
Finally `errorHandler.middleware` , the most important thing in this scope which is responsible to handle unhandled errors in the context.

look at the flow:

<p align="center" width="100%">
    <img width="40%" src="https://github.com/saman-rajabii/code-review/assets/6452692/12bb0521-848d-4e92-8ac0-5af5a7d365fd"> 
<br>Request path</br>
</p>

Here is an example how errors handled in controller:

```typescript
async function createSimulator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const simulator = request.body;

    const profile = await profileService.getProfileById(simulator.profile_id);

    if (!profile) {
      // return 404 stats response
      return response
        .status(STATUS_CODES.NOT_FOUND)
        .send({ message: MESSAGES.PROFILE_NOT_FOUND });
    }

    const res = await simulatorService.createSimulator(simulator);

    response.status(STATUS_CODES.SUCCESS).send({ data: res });
  } catch (error) {
    next(error); // direct the error to error handler middleware
  }
}
```

### Finally

To prepare the project for production, i dockerized it and added `docker-compose.yml` to gather two parties together backend and database.

---

**To start follow below steps:**

1- Add .env file in the root and like `.env.example`, then add your configuration there.

2- To run the project use this command: `docker-compose up -d`

3- To stop the project use this command `docker-compose down`

4- To run seed after the containers have been started, use this command `docker-compose exec test-backend /bin/sh -c "npm run seed"`
