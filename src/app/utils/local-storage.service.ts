import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {
  }

  // Save data to localStorage
  save(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key: string): any {

    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
    return null;
  }

  update(key: string, newData: any): void {
    const existingData = this.get(key);
    if (existingData) {
      this.save(key, {...existingData, ...newData});
    }
  }

  delete(key: string): void {
    localStorage.removeItem(key);
  }
}
