export class User {
  constructor(
    public id: string,
    public readonly email: string,
    private _token: string,
    private _tokenExpiration: Date,
  ) { }

  get token() {
    if (!this._tokenExpiration || new Date() > this._tokenExpiration) {
      return null;
    }
    return this._token;
  }

  get tokenExpiration() {
    return this._tokenExpiration;
  }
}