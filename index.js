
//lấy api
var courseApi = 'http://localhost:3000/courses';

function start(){
    getCourses(renderCoures);
    handleCreateForm();
  
};
//chạy ứng dụng
start();

//function lấy khóa học
function getCourses(callback){
    fetch(courseApi)
        .then(function(reponse){
            return reponse.json();
        })
        .then(callback);
}

//function create dư liệu fetch post
function createCourse (data,callback){
    Options = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
           
          }, 
        body: JSON.stringify(data) 
    };
    
     fetch (courseApi,Options)
     .then(function(reponse){
        return reponse.json();
    })
    .then(callback);
}

//function xóa
function handledeleteCourse(id){
    Options = {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json'
          }, 
    };
    
     fetch (courseApi+ '/' +id,Options)
     .then(function(reponse){
        return reponse.json();
    })
    .then(function(){
        var courseItem = document.querySelector('.course-item-'+id)
        courseItem.remove();
        
    });
}

//function  chuyển dữ liệu thành html in trên màn hình
function renderCoures(courses){
    var lisCoursesBlock = document.querySelector('#list-courses')
    var htmls = courses.map(function(course){
        return  `
        <li class = "courses-item course-item-${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button class="btn" onclick = "handledeleteCourse(${course.id})">Xóa</button>
            <button class="btn" onclick = "handleUpdateCourse(${course.id})" id = "update-item-${course.id}">Sửa</button>
        </li>
        `
    })
    
    lisCoursesBlock.innerHTML = htmls.join('');
}  
//function khi bấm vào btn create
function handleCreateForm(){
    var createBtn = document.querySelector('#create')
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        
        var formData = {
            name: name,
            description: description
        }
        clear();
        document.querySelector('#update').style.visibility = 'hidden'
        createCourse(formData,function(){
            getCourses(renderCoures);
            
        })
    }
}

//function update
function UpdateCourse(data){
    Options = {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json'
          }, 
        body: JSON.stringify(data) 
    };
     fetch (courseApi+ '/' +data.id,Options)
     .then(function(reponse){ 
        return reponse.json(); 
    })
    .then(function(){
        clear();
        document.querySelector('#update').style.visibility = 'hidden'
        start();
        
    });
}

//function khi bấm vào sửa
function handleUpdateCourse(id){
    //lấy course item(li) bỏ vào ô điền
    var courseItem = document.querySelector('.course-item-'+id);
    var dataId = {
        name: courseItem.querySelector('h4').innerText,
        description: courseItem.querySelector('p').innerText
    } 
    document.querySelector('input[name="name"]').value=dataId.name ;
    document.querySelector('input[name="description"]').value =dataId.description;
   
    //Thiết lập Nút update
    btnUpdate = document.querySelector('#update')
    btnUpdate.style.visibility = '';
    btnUpdate.onclick = function(){
        var Data = {
            id:id,
            name: document.querySelector('input[name="name"]').value,
            description: document.querySelector('input[name="description"]').value
        }
        UpdateCourse(Data);
    }
   
}
    function clear(){
        document.querySelector('input[name="name"]').value = null
        document.querySelector('input[name="description"]').value = null
    }