export class Person{
    constructor(firstName, lastName, dateOfBirth) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
    }

    age () {
        let now = new Date();
        let years = now.getFullYear() - this.dateOfBirth.getFullYear();

        console.log(this.dateOfBirth);

        if(now.getMonth() < this.dateOfBirth.getMonth() || 
        (now.getMonth() == this.dateOfBirth.getMonth()) && 
        now.getDate() < this.dateOfBirth.getDate()) {
            years -= 1;
        }
        return years;

    }

    static searchPeople(lastName, people){
        return people.filter(
        p => p.lastName.toLowerCase() == lastName);
    }
}