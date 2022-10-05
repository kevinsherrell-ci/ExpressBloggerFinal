const isEmpty = require('./isEmpty');

const validateBlog = (blogData)=>{
    console.log("validate blog is runnin g");
    let errors = [];
    const addError = (type, message)=>{
        errors.push({
            type: type,
            message: message
        })
    }
    const {title, text, author, email, categories, starRating} = blogData

    if(isEmpty(blogData)){
        addError("blogData", "blog data is invalid");
    }
    // title
    if(isEmpty(title)){
        addError("title", "title must not be empty");
        console.log(errors);

    }
    if(typeof title !== "string"){
        addError("title", "title must be a string");
    }
    if(title.length > 30){
        addError("title", "title must be no longer than 30 characters");
    }
    // text
    if(isEmpty(text)){
        addError("text", "text must not be empty");
    }
    if(typeof text !== "string"){
        addError("text", "text must be a string");
    }
    // author
    if(isEmpty(author)){
        addError("author", "author must not be empty");
    }
    if(typeof author !== "string"){
        addError("author", "author must be a string");
    }
    // email
    if(isEmpty(email)){
        addError("email", "email must not be empty");
    }
    if(typeof email !== "string"){
        addError("email", "email must be a string");
    }
    if(!email.includes("@")){
        addError("email", "not a valid email - format: email@email.com");
    }
    if(email[(email.length -1) - 3] !== "."){
        addError("email", "not a valid email - format: email@email.com");
    }
    // star rating
    if(isEmpty(starRating)){
        addError("starRating", "star rating must not be empty");
    }
    if(typeof starRating !== "number"){
        addError("starRating", "star rating must be a number");
    }
    if(starRating < 1 || starRating > 10 ){
        addError("starRating", "star rating must be between 1 and 10");
    }
    // categories
    if(!Array.isArray(categories)){
        addError("categories", "categories must be an array");
    }
    if(categories.length > 0 ){
        categories.forEach(category=>{
            if(typeof category !== "string"){
                addError("cateories", "categories must be of type string");
            }
        })
    }

    if(isEmpty(errors)){
        return {isValid: true};
    }else{
        return {
            isValid: false,
            errors: errors
        }
    }

}
module.exports = validateBlog;