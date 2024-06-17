export class ServerErrorException extends Error {
  constructor(message = 'Terjadi kesalahan pada server') {
    super(message);
    this.name = 'ServerErrorResponse';
  }
}
