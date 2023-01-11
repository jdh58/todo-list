// Use local storage to store the todo array and project array
export const updateStorage = (toDoArr, projectArr) => {
    // First clear the storage
    localStorage.clear();

    // Now import the toDoArr
    for (let i = 0; i < toDoArr.length; i++) {
        const setStorage = (type) => {
            localStorage.setItem(`toDo${i}-${type}`, toDoArr[i][`${type}`])
        }
        setStorage('task')
        setStorage('date')
        setStorage('priority')
        setStorage('notes')
        setStorage('project')
        setStorage('uniqueID')
    }

    console.log(projectArr)
    // Now for the projectArray
    for (let i = 0; i < projectArr.length; i++) {
        const setStorage = (type) => {
            localStorage.setItem(`project${i}-${type}`, projectArr[i][`${type}`])
        }
        setStorage('name')
        setStorage('color')
        setStorage('id')
    }
}

// Turn the local storage keys and values into arrays we can use
export const convertStorage = (toDoArr, projectArr) => {
    
    let i = 0;
    toDoArr = [];

    console.log(localStorage.getItem(`toDo${i}-task`))
    // Import the todo array
    while (typeof localStorage.getItem(`toDo${i}-task`) === 'string') {

        let newToDo = {};

        const makeNewToDo = (type) => {
            newToDo[`${type}`] = localStorage.getItem(`toDo${i}-${type}`)
        }

        makeNewToDo('task')
        makeNewToDo('date')
        makeNewToDo('priority')
        makeNewToDo('notes')
        makeNewToDo('project')
        makeNewToDo('uniqueID')

        newToDo.uniqueID = +newToDo.uniqueID;

        toDoArr.push(newToDo);

        // Iterate i to go onto next todo
        i++;
    }

    // Set i back to 0 so we start at the beginning for the project array
    i = 0;

    projectArr = [];

    // Now for the projectArray
    while (typeof localStorage.getItem(`project${i}-name`) === 'string') {

        let newProject = {};

        const makeNewProject = (type) => {
            newProject[`${type}`] = localStorage.getItem(`project${i}-${type}`)
        }

        makeNewProject('name')
        makeNewProject('color')
        makeNewProject('id')

        newProject.id = +newProject.id;

        console.log(newProject)

        projectArr.push(newProject);

        // Iterate i to go onto next todo
        i++;
    }

    console.log(projectArr)
    return [toDoArr, projectArr];
}