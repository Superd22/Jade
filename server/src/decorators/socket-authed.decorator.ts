// import { JadeSocket } from './../controllers/connection.controller';
// import { ConnectedSocket } from "socket-controllers";

// export function SocketAuthed() {
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

//         if (descriptor === undefined) {
//             const newDesc = Object.getOwnPropertyDescriptor(target, propertyKey);
//             if (!newDesc) throw new Error(`Can't find method descriptor`);
//             descriptor = newDesc;
//         }
//         const originalMethod: Function = descriptor.value;

//         //editing the descriptor/value parameter
//         descriptor.value = function (@ConnectedSocket() socket: JadeSocket) {
//             var args = [];
//             for (var _i = 0; _i < arguments.length; _i++) {
//                 args[_i - 0] = arguments[_i];
//             }
//             var a = args.map(function (a) { return JSON.stringify(a); }).join();
//             // note usage of originalMethod here
//             var result = originalMethod.apply(target, args);
//             var r = JSON.stringify(result);
//             console.log("Call: " + key + "(" + a + ") => " + r);
//             return result;
//         };

//         // return edited descriptor as opposed to overwriting the descriptor
//         return descriptor;
//     }
// }