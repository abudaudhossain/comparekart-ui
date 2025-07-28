export const cookies = {
    /**
     * @description Get cookie value by key
     * @param {String} name - cookies key name
     *
     * @return {String} Cookie value or null
     */
    get: (name: string): string | null => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            const part = parts.pop();
            return part ? part.split(";").shift() || null : null;
        }
        return null;
    },

    /**
     *@description Set cookie value by key , value and expire time
     * @param {String} name - Cookie key name
     * @param {String} value - Value of set cookie value
     * @param {Number} days - Expire time of cookie
     */
    set: (name: string, value: string, days: number | null = null) => {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }

        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    remove: (name: string) => {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
};
