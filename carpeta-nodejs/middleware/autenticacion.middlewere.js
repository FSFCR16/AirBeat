import jwt from 'jsonwebtoken'

export const authVerification = (request, response, next) => {

    try {
        console.log(request.headers.authorization)
        if (!request.headers.authorization) {
            return response.status(401).json({ error: 'Debes enviar un token de autenticación' })
        }

        let token = ''

        if (request.headers.authorization.includes('key')) {
            token = request.headers.authorization.split(' ')[1]

        } else {
            return response.status(401).json({ error: 'El formato del token es incorrecto' })
        }


        let decode = jwt.verify(token, process.env.JWT_KEY);
        request.user = decode
        console.log(request.user)

        next()

    } catch (e) {
        return response.status(500).json(e)
    }
}

