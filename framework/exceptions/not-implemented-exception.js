function NotImplementedException( message ) {
  message = message ? message : 'Method not implmemented!';

  this.message = message;

  throw new Error( this.message );
}