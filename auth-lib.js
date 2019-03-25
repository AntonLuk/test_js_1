let allUsers = new Map();
let allGroups = new Map();
let allRights = new Map();
let session = new Map();
function createUser(username, password) {
    if (username.length != 0){
        if (allUsers.has(username)){
            throw new Error('Пользователя не существует');
        }
        allUsers.set(username, password);

        return username;
    }else {
        throw new Error('Никнейм пустой');
    }
}

function deleteUser(username) {
    if (username.length != 0){
        if (!allUsers.has(username)){
            throw new Error('Пользователь не найдет');
        }
        allUsers.delete(username);
    }else {
        throw new Error('Никнейм пустой');
    }
}

function users() {
    var users = [];
    for (let user of allUsers.keys()){
        users.push(user);
    }
    allUsers.forEach(function (value,key) {
        users.push(key);
    });
    return users;

}

function createGroup(){
    let group = {};
    if (group.length != 0){
        if (allGroups.has(group)){
            throw new Error('Такая группа уже есть');
        }
        allGroups.set(group, []);
    }else{
        throw new Error('Ошибка');
    }
    return group;
}

function deleteGroup(group) {
    if (group.length != 0){
        if (!allGroups.has(group)){
            throw new Error('Нет группы');
        }
        allGroups.delete(group);
    }else{
        throw new Error('Неверные данные');
    }
}

function groups() {
    return Array.from(allGroups.keys());
}

function addUserToGroup(username, group) {
    if (group.length == 0){
        throw new Error('Неверные данные');
    }
    if (username.length == 0){
        throw new Error('Никнейм пустой');
    }

    if (!allUsers.has(username)){
        throw new Error('Пользователь не найдет');
    }
    if (!allGroups.has(group)){
        throw new Error('Группа не найдена');
    }
    allGroups.get(group).push(username);
}

function userGroups(username) {
    if (username.length == 0){
        throw new Error('Никнейм пустой');
    }
    if (!allUsers.has(username)){
        throw new Error('Пользователь не найдет');
    }
    let userGroups = [];

    for (let group of allGroups.keys()){
        for (let i = 0, elem = allGroups.get(group); i < allGroups.get(group).length; i++){
            if (elem[i] == username){
                userGroups.push(group);
            }
        }
    }
    return userGroups;
}

function removeUserFromGroup(username, group) {

    if (!allUsers.has(username)){
        throw new Error('Нет пользователя');
    }
    if (!allGroups.has(group)){
        throw new Error('Нет такой группы');
    }
    if (username.length == 0){
        throw new Error('Никнейм пустой');
    }
    if (group.length == 0){
        throw new Error('Неверные данные');
    }

    if (!allGroups.get(group).includes(username)){
        throw new Error('Нет пользователя в группе');
    }
    allGroups.get(group).splice(allGroups.get(group).indexOf(username));
}

function createRight() {

    var right = {};

    if (right.length != 0){
        if (allRights.has(right)){
            throw new Error('Такое право существует');
        }
        allRights.set(right, []);
    }else{
        throw new Error('Ошибка');
    }

    return right;
}

function deleteRight(right) {
    if (right.length == 0){
        throw new Error('Ошибка');
    }
    if (!allRights.has(right)){
        throw new Error('Не найдено');
    }
    allRights.delete(right);
}

function groupRights(group) {
    let groupRights = [];

    if (group.length == 0){
        throw new Error('Ошибка');
    }
    if(!allGroups.has(group)){
        throw new Error('Нет группы');
    }
    for (let right of allRights.keys()){
        for (let i = 0, elem = allRights.get(right); i < allRights.get(right).length; i++){
            if (elem[i] == group){
                groupRights.push(right);
            }
        }
    }
    return groupRights;
}

function rights() {
    return Array.from(allRights.keys());
}

function addRightToGroup(right, group) {
    if (right.length == 0){
        throw new Error('Ошибка');
    }
    if (group.length == 0){
        throw new Error('Неправильные данные');
    }
    if (!allRights.has(right)){
        throw new Error('Нет право');
    }
    if(!allGroups.has(group)){
        throw new Error('Нет группы');
    }
    allRights.get(right).push(group);
}

function removeRightFromGroup(right, group) {
    if (!allRights.has(right)){
        throw new Error('Нет право');
    }
    if (!allGroups.has(group)){
        throw new Error('Нет группы');
    }
    if (right.length == 0){
        throw new Error('Ошибка');
    }
    if (group.length == 0){
        throw new Error('Неверные данные');
    }
   
    if(!allRights.get(right).includes(group)){
        throw new Error('Нет группы для этого права');
    }
    allRights.get(right).splice(allRights.get(right).indexOf(group));
}

function login(username, password) {
    if (!session.has(username)){
        session.set(username, false);
    }
    let res = false;
    if (allUsers.has(username)){
        if (allUsers.get(username) === password){
            if (session.get(username) == false){
                session.set(username, true);
                res = true;
            }else {
                res = false;
            }
        } else {
            res = false;
        }
    }else {
        res = false
    }

    return res;
}

function currentUser() {
    let current;
    for (let user of session.keys()){
        current = user;
    }
    return current;
}

function logout() {
    if (session.size != 0){
        session.clear();
    }
}

function isAuthorized(username, right) {

    let res = false;
    let userGroups = [];
    if (allGroups.size == 0){
        throw new Error('Ошибка');
    }
    if (!allRights.has(right)){
        throw new Error('Нет права');
    }
    if (username.length == 0){
        throw new Error('Никнейм пустой');
    }
    if (right.length == 0){
        throw new Error('Ошибка');
    }
    if (!allUsers.has(username)){
        throw new Error('Нет пользователя');
    }

    for (let group of allGroups.keys()){
        for (let i = 0, elem = allGroups.get(group); i < allGroups.get(group).length; i++){
            if (elem[i] == username){
                userGroups.push(group);
            }
        }
    }
    let userRights = [];
    for (let right of allRights.keys()){
        for (let i = 0, elem = allRights.get(right); i < allRights.get(right).length; i++){
            for (let j = 0; j < userGroups.length; j++){
                if (userGroups[j] == elem[i]){

                    userRights.push(right);
                }
            }
        }
    }
    if (userRights.includes(right)){
        res = true;
    }else{
        res = false;
    }
    return res;
}
