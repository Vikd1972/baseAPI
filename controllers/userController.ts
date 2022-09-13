exports.addUser = function (request, response){
    response.send("Add user");
};
exports.changeUser = function (request, response){
    response.send("Change user");
};
exports.deleteUser = function (request, response){
    response.send("Delete user");
};
exports.getUsers = function(request, response){
    response.send("List users");
};