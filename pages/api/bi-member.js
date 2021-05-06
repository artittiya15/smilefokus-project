export default async (req, res) => {
    const data = await new Promise((resolve, reject) => {
        fetch('https://wegivmerchantapp.firebaseapp.com/exam/bi-member-day-2020-04-01.json')
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    });
    res.status(200).json(data);
};
    