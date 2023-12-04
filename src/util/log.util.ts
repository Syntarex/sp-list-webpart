export const log = (...data: any) => {
    console.log("ℹ️ list-webpart", ...data);
};

export const warn = (...data: any) => {
    console.warn("⚠️ list-webpart", ...data);
};

export const error = (...data: any) => {
    console.error("‼️ list-webpart", ...data);
};
