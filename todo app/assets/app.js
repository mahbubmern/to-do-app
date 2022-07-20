const task_list = document.querySelector('.task-list');
const add = document.querySelector('.add');
const no = document.querySelector('.no');
const yes = document.querySelector('.yes');
const addtask = document.querySelector('#addtask');
const edittask = document.querySelector('#edittask');


const getAllData = () =>{

    const data = getData('task');
    list = '';
    
    if (!data || data.length ==0) {
        list = task_list.innerHTML = `
            <p style="color:white" class="text-center">No Task Found</p>
        `
    }

    if (data && data.length > 0) {
     
        data.map((item, index)=>{
            list += task_list.innerHTML = `
            <div class="my-3">
                     <a href="#">${item.task}</a>
                <div class="icon-list">
                        <a href="#edit_task" data-bs-toggle="modal"><i class="fas fa-edit task_edit" task_index = ${index} ></i></a> 
                       <a href= "#delete_task" data-bs-toggle="modal"><i class="fas fa-trash task_delete" task_index = ${index}></i></a>
                </div>
            </div>
`
        })
    }

    task_list.innerHTML = list;
}
getAllData();






addtask.onsubmit=(e)=>{
    e.preventDefault();

   const form_data = new FormData(e.target);
   const data = Object.fromEntries(form_data.entries());
   const {task} = Object.fromEntries(form_data.entries());

   sendData('task', data);
    e.target.reset();
    getAllData();


}


task_list.onclick = (e)=>{
    e.preventDefault();

   

    if (e.target.classList.contains('task_edit')) {

        let index = e.target.getAttribute('task_index');
        
        let data = getData('task');
        let {task} = data[index]

        edittask.innerHTML = `
        <div class="task">
             <input type="text" name="task" class="form-control w-75" placeholder="Type Your Task" value="${task}">
             <input type="hidden" name="index" class="form-control w-75" value="${index}">
             <input type="submit" class="form-control w-25" value="Edit" data-bs-dismiss="modal"></input>
        </div>
        
        `



    }

    if (e.target.classList.contains('task_delete')) {
        let index = e.target.getAttribute('task_index');
        
        yes.onclick = (e)=>{
            e.preventDefault();
            let data = getData('task');
            data.splice(index, 1);
            update('task', data);
            getAllData();
        }
    }
    
}




edittask.onsubmit = (e)=>{
    e.preventDefault();
   
    const form_data = new FormData(e.target);
    const dataform = Object.fromEntries(form_data.entries());
    const {task,index} = Object.fromEntries(form_data.entries());


    const data = getData('task');
    data[index] = {task};

    update('task', data);
    getAllData();
    



}