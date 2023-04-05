const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String, unique: true, require: true
    },
    name: {
        type: String, require: true
    },
    password: {
        type: String, require: true
    }
}
);

export default mongoose.models.auth || mongoose.model('auth', userSchema);