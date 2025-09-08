
export enum Filter {
  FileName = "file",
  FolderName = "folder",
  Sha1 = "sha1",
}

export type FilterType ={
  folder: string,
  filename: string,
  sha1: string,
  query: string,
  }

  export type LayoutType ={
  page: number,
  pageSize: number,
 
  }
 

// Record<string, any>
// eg: export type QueryResult<T = Record<string, any>> = {
 
export type QueryOption = {
    label: string
    id: string
}
export type CountRow = { total: number }

export type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type FileRecord = {
    id : number;
    filePath : string;
    folderName : string;
    fileName : string;
    sha1Hash : string;
    md5Hash : string;
    mimeType  : string;
    fileTimestamp : string; // DATETIME  (formato ISO8601 tipo "2025-09-05 14:30:00");
    fileSize: number;
    infoUpdated : string; // DATETIME (formato ISO8601 tipo "2025-09-05 14:30:00"); DATETIME;
};

 
export type FileRecordQ0 = FileRecord[]; 
export type FileRecordQ01 = Pick<FileRecord, "fileName" | "mimeType" | "sha1Hash"> & { count: number };
export type FileRecordQ02 = FileRecord[];  
export type FileRecordQ03 = Pick<FileRecord, "folderName" | "sha1Hash"> & { count: number };
export type FileRecordQ04 = FileRecord[];  
export type FileRecordQ09 = Pick<FileRecord, "fileName"  > & { count: number };
export type TotalType = {total: number};


// export type QueryResult<T = Record<string, any>> = {
export type QueryResult<T> = {
  status: string;
  data: Array<T>;
  pagination: Pagination;
};

