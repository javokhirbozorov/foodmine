import { Injectable } from '@angular/core';
import { sample_food } from '../data';
import { Food } from '../shared/models/Food';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }
  getAll():Food[]{
    return sample_food
  }
  getAllFoodsBySearchTerm(searchTerm:string){
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

}
