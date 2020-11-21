interface Name {
  givenName: string;
  familyName: string;
}

export interface IProfile {
  provider: string;
  id: string;
  name: Name;
  email: string;
}
