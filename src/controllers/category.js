
const slugify = require('slugify');
const Category = require('../models/category')

exports.createCategory=async (req, res) => {

    

    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

   if(req.file){
       categoryObj.categortImg=process.env.API+'/'+req.file.filename

   }

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId
    }
    try {
        const newCategory = new Category(categoryObj);
        const category = await newCategory.save()
        return res.status(201).json({ category })

    } catch (err) {
        res.status(400).json({err})
    }
}
exports.getCategory=(req,res)=>{
   Category.find({})
              .then(cat=>{
                //console.log(cat)
                 const categoryList=createCategoryList(cat)
                  
                  return res.status(200).json({categoryList})
              })
              .catch(err=>[
                  res.status(400).json({err})
              ])

}

function createCategoryList(categories,parentId=null){

    let categoryList=[]
    let category;
    if(parentId==null){
      category= categories.filter(cats=>cats.parentId == undefined)
    }else{
        category=categories.filter(cats=>cats.parentId == parentId)
    }

    //console.log(category)
    //console.log('**************************')

    for(let cat of category){
        //console.log("kkkk")
        categoryList.push({
            _id:cat._id,
            name:cat.name,
            slug:cat.slug,
            children:createCategoryList(categories,cat._id)
        })
    
    }
    //console.log(categoryList)
    return categoryList;

}