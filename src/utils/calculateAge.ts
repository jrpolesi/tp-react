export function calculateAge(birthdate: Date) {
    const today = new Date();

    let years = today.getFullYear() - birthdate.getFullYear();

    const birthdayNotOccurred =
        today.getMonth() < birthdate.getMonth() ||
        (today.getMonth() === birthdate.getMonth() &&
            today.getDate() < birthdate.getDate());

    if (birthdayNotOccurred) {
        years -= 1;
    }

    const lastBirthday = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());
    if (birthdayNotOccurred) {
        lastBirthday.setFullYear(today.getFullYear() - 1);
    }

    const days = Math.floor((today.getTime() - lastBirthday.getTime()) / (1000 * 60 * 60 * 24));

    return {
        years,
        days,
    };
}
