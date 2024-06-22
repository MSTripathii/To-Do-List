const title = document.getElementById('title');
const description = document.getElementById('text-area')
const radio = document.querySelectorAll('input[type="radio"]')
const submit = document.getElementById('submit')
const task_box = document.getElementById('task-boxx')
// const task_heading = document.getElementById('task-heading')
// const task_description = document.getElementById('task-description')
// const task_priority_text = document.getElementById('priority-text')
// const task_priority = document.getElementById('priority')
// const closee = document.getElementById('close')

let arr_radio = Array.from(radio)


//for adding the task bar on submit

submit.addEventListener('submit', (e) => {
    e.preventDefault()

    const newDiv = task_box.cloneNode(true)

    newDiv.querySelector('#task-heading').innerHTML = title.value
    newDiv.querySelector('#task-description').innerHTML = description.value

    //Remove Task Box after task completion

    newDiv.querySelector('#close').addEventListener('click', function (ele) {
        document.body.removeChild(newDiv);
    })

    arr_radio.forEach(ele => {
        if (ele.checked) {

            const task_priority = newDiv.querySelector('#priority')
            const task_priority_text = newDiv.querySelector('#priority-text')

            if (ele.value == 'safe') {
                task_priority.style.backgroundColor = '#38b000'
                task_priority_text.innerHTML = 'Aaram se Karna'
            }
            else if (ele.value == 'littlesafe') {
                task_priority.style.backgroundColor = 'brown'
                task_priority_text.innerHTML = 'Time Nikal ke kro'
            }
            else {
                task_priority.style.backgroundColor = '#d90429'
                task_priority_text.innerHTML = 'Abhi kro jldi'
            }
        }
    })
    document.body.appendChild(newDiv)
    newDiv.style.display = 'block'
    MakeMovable(newDiv)
    submit.reset()
})

//for making the task bar movable
//LEARNED AND THEN WRITTEN

function MakeMovable(element) {

    let offsetx, offsety;
    let isdragging = false

    //Desktop dragging

    element.addEventListener('mousedown', movestart);
    document.addEventListener('mousemove', ismoving);
    document.addEventListener('mouseup', moveend);

    //Mobile Dragging

    element.addEventListener('touchstart', touchbegin);
    document.addEventListener('touchmove', touchmoving);
    document.addEventListener('touchend', touchstop);

    function movestart(e){
        isdragging = true;
        offsetx = e.clientX - element.offsetLeft;
        offsety = e.clientY - element.offsetTop;
    }

    function ismoving(e){

        if (!isdragging) return;

        let newX = e.clientX - offsetx;
        let newY = e.clientY - offsety;

        moveElement(newX, newY);
    }

    function moveend(){
        isdragging = false
    }

    function touchbegin(e) {
        isdragging = true;
        offsetx = e.touches[0].clientX - element.offsetLeft;
        offsety = e.touches[0].clientY - element.offsetTop;
    }

    function touchmoving(e){
        if (!isdragging) return;

        let newX = e.touches[0].clientX - offsetx;
        let newY = e.touches[0].clientY - offsety;

        moveElement(newX, newY);
    }

    function touchstop(){
        isdragging = false
    }

    function moveElement(newX, newY) {

        const bodyWidth = document.body.clientWidth;
        const bodyHeight = document.body.clientHeight;
        const elemWidth = element.offsetWidth;
        const elemHeight = element.offsetHeight;

        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX + elemWidth > bodyWidth) newX = bodyWidth - elemWidth;
        if (newY + elemHeight > bodyHeight) newY = bodyHeight - elemHeight;

        element.style.left = `${newX}px`;
        element.style.top = `${newY}px`;
    }
}

// to prevent right click

document.addEventListener('contextmenu', function(ele){
    ele.preventDefault();
})