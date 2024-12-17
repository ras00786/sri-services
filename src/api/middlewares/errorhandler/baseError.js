// Base error classes to extend from
export class CustomError extends Error {
    get name() {
      return this.constructor.name;
    }
  }
  
  export class ServerError extends CustomError {}
  
  export class ClientError extends CustomError {}
  
  export class SequalizeError extends CustomError {}

  