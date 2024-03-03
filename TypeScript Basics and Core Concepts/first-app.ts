let userName = 'Max';
userName = 34; // causes ERROR due to strict typing
// to avoid this, we can simply let userName without assignments first -  but will default to JS behaviour without type checking

// better still, we can assign types by ourself using a colon:
let newUserName: string;
newUserName = 34; // not allowed
newUserName = 'Max';

let userAge : number = 34;

let isValid = true; // string, number, boolean all work

// use command `tsc` or `npx tsc` to compile

// user pipe symbol to give a var multiple types
let userID: string | number = 'abc1';
userID = 123;
// userID = true;


// we could set user to object type for safety, but it also isnt very safe regarding the structure of the object (empty obj for instance)
//  let user: object;

// instead, we can define the whole structure
let user: { 
    name: string; 
    age: number;
    isAdmin: boolean; 
    id: string | number
};

user = {
    name: 'Max',
    age: 34,
    isAdmin: true,
    id: 'abc' //123
}

user = {}

// we cannot just use `Array`, but need to include array type of values
// let hobbies: Array<string>; 
// OR more concisely:
let hobbies: string[];
hobbies = ['Sports','Cooking','Reading']
// hobbies = [1,2,3]

// const are not reassignable, and usually we leave type inference since its non-mutable
// use a colon after params in a function to indicate return type, including void if there are no returns
function add(a: number, b: number) {
    const result = a + b;
    console.log(result);
    return result; // if return type was void, ERROR
}

// in JS, functions can be accepted as values. we can also assign functiontypes to them
// we can create custom types using a TS keyword `type` as doing something like:
//  calcFn: (a:number, b: number) => number 
// can make function def a bit long
type AddFn = (a:number, b: number) => number;
function calculate(
    a: number, 
    b: number, 
    calcFn: AddFn
    //calcFn: (a:number, b: number) => number // this can make function def a bit long tho
) {
    calcFn(a,b);
}

calculate(2, 5, add);

// custom types can also be used this way
type StringOrNum = string | number;
let uID: StringOrNum = 'abc1';

type User = {
    name: string;
    age: number;
    isAdmin: boolean;
    id: StringOrNum;
}
let newUser: User;

// similar to `type` keyword, but works like so, usually for object definitions:
interface Credentials {
    password: string;
    email: string;
}

let creds: Credentials;

creds = {
    password: 'abc',
    email: 'abc@example.com'
}

// so when to INTERFACE and when to TYPE?
// in general, type can always be used, even for function types.
class AuthCredentials implements Credentials {
    email: string;
    password:string;
    userName: string;
}
// interfaces are also easilt extendable - redefine same interface/change properties without error. useful for creating libraries for other devs to use
// interface Credentials {
//     mode: string; 
// }

// interfaces can be used when we work with classes, which is rarely used in JS
function login(credentials: Credentials){
}
login(new AuthCredentials())

// type Admin = {
//     permissions: string[];
// };

// type AppUser = {
//     userName: string;
// }

// type AppAdmin = Admin & AppUser;

// let admin: AppAdmin;

// admin = {
//     permissions: ['login'],
//     userName: 'Max',
// }

interface Admin {
    permissions: string[];
}

interface AppUser {
    userName: string;
}

interface AppAdmin extends Admin, AppUser {}

let admin: AppAdmin;

admin = {
    permissions: ['login'],
    userName: 'Max' // this will be required else ERROR
}


// literal types
type Role = 'admin' | 'user' | 'editor'; // strictly becomes this type.. unless we include unions
let role: Role;
role = 'admin';
role = 'user';
role = 'editor'; // would be ERROR if role: 'admin'; only

function performAction(action: string | number, role: Role) {
    // use JS's typeof as a guard. We do what's called 'Type Narrowing'
    if (role === 'admin' && typeof action === 'string') {
        // ...
    } else if (role === 'user') {
    } else if (role === 'editor') {}
}


let roles: Array<Role>;
roles = ['admin', 'editor'];

// Generic types: work together with another type (eg Array needs info on type of values stored in it). We can build our own generic type:
type DataStorage<T> = { //<T,U,V>, etc
    storage: T[];
    add: (data: T) => void;
};

const textStorage: DataStorage<string> = {
    storage: [],
    add(data) { // automatically string
        this.storage.push(data);
    }
}

const userStorage: DataStorage<User> = {
    storage: [],
    add(user) {}
}

function merge<T,U>(a:T,b:U){
    return {
        ...a,
        ...b
    };
}

const anotherUser = merge({ name: 'Max' }, { age: 32}); // TS can infer `merge<{name: string}, {age: number}>{ //data.. }`
anotherUser.name