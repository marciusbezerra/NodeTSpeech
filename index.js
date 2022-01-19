// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');
// Creates a client
const client = new textToSpeech.TextToSpeechClient({
    credentials: {
        client_email: 'contamarcius@totemic-ground-301121.iam.gserviceaccount.com',
        private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDSkM3IiusdgffU\nJbpbrAKd/ASf9S8gwXS1Qea+dpg+u1sI3hiILlt2XaOdfYOYICXFbgVv66UsuGjj\nkTqqYkYf6+fNDl4TepzlxIUd7vztWQjkcUM91tt/gJQTLT8v9ixRA20uk8aBBWB6\n1Yc/aXr8/GGQdMyJAETiQBzATTrf5zATC0it7Uykc5DzH7hO3a0FbM3TY9DVwdW/\n5FHbdGju7cvSGu3GjSKzcT6MXwhRiJrrvX/P89AEf+/GgRbqShH2ErWiGXnxFC9e\n9ud9qpP2bW7NDdxG7Gog1eL5lUJY1vGYA8o7kY7cYqgLplek4kAxGoHaHrFemHrQ\nIFYWortbAgMBAAECggEANboA59SaXTMWWyktPcrL+Cefvni/B6qU7tLb32k/O3Ju\nrfqNY+IAMFmAL+UguKYrPQ7vkDkeMiTzjm01/NeKcQauZKHv2ySD+BSGqraaDq2T\nGUbVE2hJJWVXYvU+lCxJ7nnjV+kY0z7d+TmWgtWVLgvvkP5cWfCZoukc7OxHw20w\n56z/pdFb27mQRhBKFhcbjMSyA40eJ4t7mlmLlNxvrRuUqLs9RG4x+rODmLZU/PxE\nDxrSWeTGA9yrJaFreX+SaNpJn1Vg4/NP999JiuXGLcZYBxmrF4vJwHjspdF0yx8r\nV72gzEfrFlW7J3pQ0NTJeN3THoEIL2Irxe4SKwyQUQKBgQD9Mfu/6hsTatvRoomG\nBu1zLedoMJfW3vo1Zw02sjWvojtU76V7vHhIrOVSlJYGgbyhVJM4BMCx1awev4E7\nmVo1Nmau20ek7kwLZcKfFLwdA9kZs6v3VnyMwUVlBNfJqROeyA6yBVJl/UcMGeoz\nsuZdT9yY69ZIDP98kG13Ra3NFwKBgQDU5e4zgs2TEr824pjTyXdhfpoFlRfSlCIO\nLXeT8bvSeZB7SfNJcctE/grcYTSLFY6J36/BD+PZMKdvYX+kCTZ4OOEchX7Sgqvp\nYeZWZk8MjkQGBT18c2imSXKXY3RYb8Vt1Ztf5A5dGj/9197bbGb0NxNpblOTmKhI\n3TuEwCLWXQKBgQCNw2ynWZZrWstVJuJFLp/Ie40zYvHBFvuU5uwZEdLJUdZSihNn\nonDekB+eCx+s6PsKgWYkWVTivTYvyR28lvJRFPKNOK12hQ4C26kKlPt2a28k2tqQ\nE9aMoLIQC5QejxIzNuQzfJNUE2myNthQtfwRhuOGo5VIpi5uOhdwTo0vZQKBgA+v\n5Y5cHAOzRO2pYrNwS+CeMIEqzDeS/LNovD/ldv56QKAlAc0umli6E1jLvNBmxTr5\nhXzHS/Wr9Rpq57nRh/bx0fyFBaRDRqGKuisxnK+DKBX9ettZsaNXFB99j4wYqEaA\nj9NP/ZL0pTRyHJS0dx2VlVOWcogUnonH62PLuIVtAoGBAKgL3/UJhs4Tz1YfUTvL\nnRN2H+ZNHUqgRSSxiGYDUWk/l/yS7BCHSEewIgzVAdZy8cOnzmUZYVJyN+0hZPxI\nO/ITiacWdc4EwEYDOVhI2JJAQMLvfCyV1LoUkDJjK0mHl9dFDxBjhNwPKobsLdqf\np+MwERznfp4FKc1vrioECezV\n-----END PRIVATE KEY-----\n'
    }

});
async function quickStart() {

    const text = 'Ei Alberto, Gomes! quando é que você vai para Guaraciaba? Quando estiver lá, informe, eu gostei dessa capinha!! ela é muito criativa, bem anos 80, com o Arnold Schwarzenegger';

    const request = {
        input: { text: text },
        // voice: { languageCode: 'pt-BR', name: 'pt-BR-Standard-A', ssmlGender: 'FEMALE' },
        voice: { languageCode: 'pt-BR', name: 'pt-PT-Wavenet-C' },
        audioConfig: { audioEncoding: 'MP3' },
    };

    const result = await client.listVoices(request);
    result.forEach(r => {
        if (r) console.log(r.voices.map(v => `${v.languageCodes}    ${v.name}   ${v.ssmlGender}`));
    });

    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');
}
quickStart();