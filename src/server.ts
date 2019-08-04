import {app} from './app';

const server = app.listen(app.get('port'), () => {
  console.log(
    'Listening on http://localhost:%d with environment %s',
    app.get('port'), process.env.NODE_ENV,
  );
});

export default server;
