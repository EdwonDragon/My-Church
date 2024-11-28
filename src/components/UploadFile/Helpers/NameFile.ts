


export const processFile = async (file: any) => {
    const fileExtension = file[0].name.split('.').pop();

    return file
        .arrayBuffer()
        .then((filebuffer: any) => window.crypto.subtle.digest('SHA-1', filebuffer))
        .then((hashBuffer: any) => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray
                .map((a) => a.toString(16).padStart(2, '0'))
                .join('');
            return { file, key: `${hashHex}.${fileExtension}` };
        });
};