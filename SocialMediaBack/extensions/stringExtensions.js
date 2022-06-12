

export default function () {
    Object.defineProperty(String.prototype, "CheckNullOrUndefined", {
        value: function CheckNullOrUndefined() {
            console.log('12 extension ',!this ? '' : this)
            return !!this ? '' : this;
        },
        writable: true,
        configurable: true,
    });
}