export class ErrorController {

    static throwSomethingWrongError() {
        console.error('Something went wrong!');
        alert('Something went wrong! Please report this!');
        throw new Error('Something went wrong!');
    }

}