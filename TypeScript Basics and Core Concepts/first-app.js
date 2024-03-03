var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var userName = 'Max';
userName = 34; // causes ERROR due to strict typing
// to avoid this, we can simply let userName without assignments first -  but will default to JS behaviour without type checking
// better still, we can assign types by ourself using a colon:
var newUserName;
newUserName = 34; // not allowed
newUserName = 'Max';
var userAge = 34;
var isValid = true; // string, number, boolean all work
// use command `tsc` or `npx tsc` to compile
// user pipe symbol to give a var multiple types
var userID = 'abc1';
userID = 123;
// userID = true;
// we could set user to object type for safety, but it also isnt very safe regarding the structure of the object (empty obj for instance)
//  let user: object;
// instead, we can define the whole structure
var user;
user = {
    name: 'Max',
    age: 34,
    isAdmin: true,
    id: 'abc' //123
};
user = {};
// we cannot just use `Array`, but need to include array type of values
// let hobbies: Array<string>; 
// OR more concisely:
var hobbies;
hobbies = ['Sports', 'Cooking', 'Reading'];
// hobbies = [1,2,3]
// const are not reassignable, and usually we leave type inference since its non-mutable
// use a colon after params in a function to indicate return type, including void if there are no returns
function add(a, b) {
    var result = a + b;
    console.log(result);
    return result; // if return type was void, ERROR
}
function calculate(a, b, calcFn
//calcFn: (a:number, b: number) => number // this can make function def a bit long tho
) {
    calcFn(a, b);
}
calculate(2, 5, add);
var uID = 'abc1';
var newUser;
var creds;
creds = {
    password: 'abc',
    email: 'abc@example.com'
};
// so when to INTERFACE and when to TYPE?
// in general, type can always be used, even for function types.
var AuthCredentials = /** @class */ (function () {
    function AuthCredentials() {
    }
    return AuthCredentials;
}());
// interfaces are also easilt extendable - redefine same interface/change properties without error. useful for creating libraries for other devs to use
// interface Credentials {
//     mode: string; 
// }
// interfaces can be used when we work with classes, which is rarely used in JS
function login(credentials) {
}
login(new AuthCredentials());
var admin;
admin = {
    permissions: ['login'],
    userName: 'Max' // this will be required else ERROR
};
var role;
role = 'admin';
role = 'user';
role = 'editor'; // would be ERROR if role: 'admin'; only
function performAction(action, role) {
    // use JS's typeof as a guard. We do what's called 'Type Narrowing'
    if (role === 'admin' && typeof action === 'string') {
        // ...
    }
    else if (role === 'user') {
    }
    else if (role === 'editor') { }
}
var roles;
roles = ['admin', 'editor'];
var textStorage = {
    storage: [],
    add: function (data) {
        this.storage.push(data);
    }
};
var userStorage = {
    storage: [],
    add: function (user) { }
};
function merge(a, b) {
    return __assign(__assign({}, a), b);
}
var anotherUser = merge({ name: 'Max' }, { age: 32 }); // TS can infer `merge<{name: string}, {age: number}>{ //data.. }`
anotherUser.name;
