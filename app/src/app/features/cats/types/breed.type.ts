export type Breed = {
  id: string;
  name: string;
  description: string;
  temperament: string;
  origin: string;
  image?: {
    url: string;
  };
}