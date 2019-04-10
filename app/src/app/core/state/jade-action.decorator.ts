/**
 * Custom action base class used to serialize to an action with a type
 * when received through the backend
 */
export function JadeAction() {
    return function (target: any) {
        target.prototype.toJSON = function() {
            return { ...this, type: (this as any).constructor.type };
        };
    };
}
