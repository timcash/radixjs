"use strict";

function log(t) {
    console.log(t);
}

function makeBucket() {
    return {
        0:[],
        1:[],
        2:[],
        3:[],
        4:[],
        5:[],
        6:[],
        7:[],
        8:[],
        9:[],
    };
}

function bucketIt (m,d,bucket,number) {
    let c1 = number % m;
    let c2 = Math.floor(c1 / d);
    bucket[c2].push(number);
    return bucket;
}

function getNext (buckets) {
    let n = null;
    let i = 0;

    while (i < 10) {
        n = buckets[i].shift();
        if(n) return n;
        i += 1;
    }

    return null;
}

function pass (i, A, B) {
    let n = "start";
    while(n) {
        n = getNext(A);
        if(n) B = single(i, n, B);
    }
    return B;
};

function single (i, n, B) {
    let m = Math.pow(10,i);
    let d = m / 10;
    B = bucketIt(m, d, B, n);
    return B;
}

function flip (A, B) {
    return {A:B, B:A};
}

function listToBucket (L) {
    let B = makeBucket();
    L.map((n) => {
        B[0].push(n);
    });

    return B;
}

function bucketToList (B) {
    let n = "start";
    let L = [];
    while(n) {
        n = getNext(B);
        if(n)  L.push(n);
    }
    return L;
}

function radix_sort (L) {
    let digit = [1,2,3];
    let A = listToBucket(L);
    let B = makeBucket();
    let buckets = {A:A, B:B};

    digit.map((i)=>{
        pass(i, buckets.A, buckets.B);
        buckets = flip(buckets.A, buckets.B);
    });

    let L2 = bucketToList(buckets.B);
    let L1 = bucketToList(buckets.A);

    log("SORTED");
    log(L1);
}

let S = [5,31,243,214,555,34,32,29,654,444,8];
log("START");
log(S);
radix_sort(S);
