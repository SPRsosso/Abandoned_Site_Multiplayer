export class FileStream {
    static async readFileAsync(fileName: string): Promise<string> {
        return new Promise<string>(async ( resolve, reject ) => {
            const parser = new DOMParser()

            const response = await fetch("pages/" + fileName);
            const data = await response.text();

            resolve(data);
        });
    }
}