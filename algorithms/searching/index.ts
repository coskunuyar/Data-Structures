
// Average: O(n)
const linearSearch = (arr: number[] , item: number):number => {
  let index = -1;
  for(let i=0; i<arr.length; i++){
    if(arr[i] === item) index = i;
  }
  return index;
}

// Average: O(logn)
const binarySeach = (arr: number[] , item: number): number => {
  let start = 0;
  let end = arr.length-1;
  let mid = Math.floor((start + end) / 2);
  while(arr[mid] !== item && start <= end){
    item < arr[mid] ? (end = mid-1) : (start = mid+1);
    mid = Math.floor((start + end) / 2);
  }
  return arr[mid] === item ? mid : -1;
}

// Average: O(n)
const naiveStringSearch = (string: string , key: string): number => {
  let count = 0;
  for(let i=0; i<string.length; i++){
    for(let j=0; j<key.length; j++){
      if(string[i+j] !== key[j]) break;
      if(j === key.length - 1) count++;
    }
  }
  return count;
}
