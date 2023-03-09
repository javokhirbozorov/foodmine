
import { Router } from "express";
import { sample_food, sample_tags } from "../data";
import expressAsyncHandler from "express-async-handler";
import {FoodModel} from '../models/food.model'
const router = Router();





router.get('/', expressAsyncHandler(  async (req,res)=>{
    const foodData = await FoodModel.find({})
    res.send(foodData)
}))


router.get('/seed', expressAsyncHandler(
    async(req, res)=>{
       const foodsCount = await FoodModel.countDocuments()
       if(foodsCount>0){
        res.send('Already seeded')
        return;
       }
     
    await FoodModel.create(sample_food);
    res.send('seeded')
    }

))

router.get('/search/:searchTerm', expressAsyncHandler( async (req,res)=>{
    const searchTerm = req.params.searchTerm;
    const searchRegExp = new RegExp(searchTerm, 'i')
    const foods = await FoodModel.find({name:{$regex:searchRegExp}})

    res.send(foods)
}))

router.get('/tags', expressAsyncHandler(  async (req, res)=>{
    const tagName = req.params.tagName;

    const tags = await FoodModel.aggregate([
        {
            $unwind:'$tags'
        },

        {
            $group:{
                _id:'$tags',
                count:{$sum: 1}
            }
        },

        {
            $project:{
                _id:0,
                name:'$_id',
                count:'$count'
            }
        }
    ]).sort({count:-1});

    const all ={
        name:'All',
        count: await FoodModel.countDocuments()
    }
    tags.unshift(all),


    res.send(tags)
}))

router.get('/tag/:tagName', expressAsyncHandler(  async (req, res)=>{
    const tagName = req.params.tagName;

    const foods = await FoodModel.find({tags:tagName});
    res.send(foods)
}))


router.get('/:foodId', expressAsyncHandler(  async (req, res)=>{
    const foodId = req.params.foodId;

    const food = await FoodModel.findById(foodId)

    res.send(food)
}))




export default router
