class StorageService {
    private storage: Storage;

    constructor() {
        this.storage = localStorage;
    }

    get<T>(key: string): T | undefined {
        try {
            const item = this.storage.getItem(key)
            if (!item) return;
            return JSON.parse(item);
        } catch (err) {
            console.error(err);
            return;
        }
    }

    set<T>(key: string, value: T) {
        try {
            const parsedValue = JSON.stringify(value);
            localStorage.setItem(key, parsedValue);
            return;
        } catch (err) {
            console.error(err);
            return;
        }
    }

    remove(key: string) {
        try {
            return localStorage.removeItem(key);
        } catch (err) {
            console.error(err);
            return;
        }
    }
};

export default new StorageService();