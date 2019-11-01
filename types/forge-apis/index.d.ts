// Type definitions for Forge-apis 0.4
// Project: https://github.com/Autodesk-Forge/forge-api-nodejs-client
// Definitions by: Autodesk Forge Partner Development <https://github.com/Autodesk-Forge>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.0

// Copyright (c) Autodesk, Inc. All rights reserved
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.

/// <reference types="node" />

/**
 * https://forge.autodesk.com/en/docs/oauth/v2/developers_guide/scopes
 */
export type Scope =
    | 'user-profile:read'
    | 'user:read'
    | 'user:write'
    | 'viewables:read'
    | 'data:read'
    | 'data:write'
    | 'data:create'
    | 'data:search'
    | 'bucket:create'
    | 'bucket:read'
    | 'bucket:update'
    | 'bucket:delete'
    | 'code:all'
    | 'account:read'
    | 'account:write';

export interface ApiResponse {
    body: any;
    headers: { [index: string]: string };
    statusCode: number;
}

export interface ApiError {
    statusCode: number;
    statusMessage: string;
    statusBody: object;
}

/**
 * https://forge.autodesk.com/en/docs/oauth/v2/reference/http/authenticate-POST/#body-structure
 */
export interface Credentials {
    client_id: string;
    client_secret: string;
    grant_type: string;
    scope?: Scope;
}

/**
 * https://forge.autodesk.com/en/docs/oauth/v2/reference/http/authenticate-POST/#body-structure-200
 * https://forge.autodesk.com/en/docs/oauth/v2/reference/http/gettoken-POST/#body-structure-200
 */
export interface AuthToken {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token?: string;
}

export class AuthClientTwoLegged {
    constructor(clientId: string, clientSecret: string, scopes: Scope[], autoRefresh: boolean);

    authenticate(): Promise<AuthToken>;
    getCredentials(): AuthToken;
    setCredentials(credentials: AuthToken): void;
    isAuthorized(): boolean;
}

export class AuthClientThreeLegged {
    constructor(clientId: string, clientSecret: string, redirectUri: string, scopes: Scope[], autoRefresh: boolean);

    generateAuthUrl(): string;
    getToken(code: string): Promise<AuthToken>;
    refreshToken(credentials: AuthToken): Promise<AuthToken>;
}

export type AuthClient = AuthClientTwoLegged | AuthClientThreeLegged;

export interface Activity {
    id: string;
    instruction: object;
    appPackages: string[];
    requiredEngineVersion: string;
    parameters: object;
    allowedChildProcesses: object[];
    version: number;
    description?: string;
    hostApplication?: string;
    isPublic: boolean;
}

export interface ActivityOptional {
    id?: string;
    instruction?: object;
    appPackages?: string[];
    requiredEngineVersion?: string;
    parameters?: object;
    allowedChildProcesses?: object[];
    version?: number;
    description?: string;
    hostApplication?: string;
    isPublic?: boolean;
}

export interface ActivityVersion {
    version?: number;
}

export class ActivitiesApi {
    /**
     * Creates a new Activity.
     */
    createActivity(activity: Activity, oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * Removes a specific Activity.
     */
    deleteActivity(id: string, oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * Removes the version history of the specified Activity.
     */
    deleteActivityHistory(id: string, oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * Returns the details of a specific Activity.
     */
    getActivity(id: string, oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * Returns all old versions of a specified Activity.
     */
    getActivityVersions(id: string, oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * Returns the details of all Activities.
     */
    getAllActivities(oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * Updates an Activity by specifying only the changed attributes.
     */
    patchActivity(
        id: string,
        activity: ActivityOptional,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Sets the Activity to the specified version.
     */
    setActivityVersion(
        id: string,
        activity: ActivityOptional,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;
}

export interface AppPackage {
    id: string;
    resource: string;
    references: string[];
    requiredEngineVersion: string;
    version: number;
    description?: string;
    isPublic?: boolean;
    isObjectEnabler?: boolean;
}

export interface AppPackageOptional {
    id?: string;
    resource?: string;
    references?: string[];
    requiredEngineVersion?: string;
    version?: number;
    description?: string;
    isPublic?: boolean;
    isObjectEnabler?: boolean;
}

export interface AppPackageVersion {
    version?: number;
}

export class AppPackagesApi {
    /**
     * Creates an AppPackage module.
     */
    createAppPackage(appPackage: AppPackage, oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * Removes a specific AppPackage.
     */
    deleteAppPackage(id: string, oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * Removes the version history of the specified AppPackage.
     */
    deleteAppPackageHistory(id: string, oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * Returns the details of all AppPackages.
     */
    getAllAppPackages(oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * Returns the details of a specific AppPackage.
     */
    getAppPackage(id: string, oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * Returns all old versions of a specified AppPackage.
     */
    getAppPackageVersions(id: string, oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * Requests a pre-signed URL for uploading a zip file that contains the binaries for this AppPackage.
     */
    getUploadUrl(oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * Requests a pre-signed URL for uploading a zip file that contains the binaries for this AppPackage.
     * Unlike the GetUploadUrl method that takes no parameters, this method allows the client to request
     * that the pre-signed URL to be issued so that the subsequent HTTP PUT operation will require
     * Content-Type=binary/octet-stream.
     */
    getUploadUrlWithRequireContentType(
        require: boolean,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Updates an AppPackage by specifying only the changed attributes.
     */
    patchAppPackage(
        id: string,
        appPackage: AppPackageOptional,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Sets the AppPackage to the specified version.
     */
    setAppPackageVersion(
        id: string,
        appPackageVersion: AppPackageVersion,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Updates an AppPackage by redefining the entire Activity object.
     */
    updateAppPackage(
        id: string,
        appPackage: AppPackage,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;
}

export interface PostBucketsPayloadAllow {
    authId: string;
    access: string;
}

export interface PostBucketsPayload {
    bucketKey: string;
    allow?: PostBucketsPayloadAllow[];
    policyKey: string;
}

export class BucketsApi {
    /**
     * Use this endpoint to create a bucket. Buckets are arbitrary spaces created and owned by applications.
     * Bucket keys are globally unique across all regions, regardless of where they were created, and they
     * cannot be changed. The application creating the bucket is the owner of the bucket.
     */
    createBucket(
        postBuckets: PostBucketsPayload,
        opts: { xAdsRegion?: string },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * This endpoint will delete a bucket.
     */
    deleteBucket(bucketKey: string, oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * This endpoint will return the details of a bucket.
     */
    getBucketDetails(bucketKey: string, oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * This endpoint will return the buckets owned by the application. This endpoint supports pagination.
     */
    getBuckets(
        opts: { region?: string; limit?: number; startAt?: string },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;
}

export interface JobPayloadInput {
    urn: string;
    compressedUrn?: boolean;
    rootFilename?: string;
}

export interface JobObjOutputPayloadAdvanced {
    exportFileStructure?: string;
    modelGuid?: string;
    objectIds?: string[];
}

export interface JobPayloadItem {
    type: string;
    views?: string[];
    advanced?: JobObjOutputPayloadAdvanced;
}

export interface JobPayloadOutput {
    formats: JobPayloadItem[];
}

export interface JobPayload {
    input: JobPayloadInput;
    output: JobPayloadOutput;
}

export class DerivativesApi {
    /**
     * Deletes the manifest and all its translated output files (derivatives). However, it does not delete the design source file.
     */
    deleteManifest(urn: string, oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * Downloads a selected derivative. To download the file, you need to specify the file’s URN, which you retrieve by calling the GET {urn}/manifest endpoint.
     * Note that the Model Derivative API uses 2 types of URNs. The design URN is generated when you upload the source design file to Forge, and is used when
     * calling most of the Model Derivative endpoints. A derivative URN is generated for each translated output file format, and is used for downloading the output
     * design files. You can set the range of bytes that are returned when downloading the derivative, using the range header.
     */
    getDerivativeManifest(
        urn: string,
        derivativeUrn: string,
        opts: { range?: number },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Returns an up-to-date list of Forge-supported translations, that you can use to identify which types of derivatives are supported for each source file type.
     * You can set this endpoint to only return the list of supported translations if they have been updated since a specified date. See the Supported Translation
     * Formats table for more details about supported translations. Note that we are constantly adding new file formats to the list of Forge translations.
     */
    getFormats(
        opts: { ifModifiedSince?: Date; acceptEncoding?: string },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Returns information about derivatives that correspond to a specific source file, including derviative URNs and statuses.
     * The URNs of the derivatives are used to download the generated derivatives when calling the GET {urn}/manifest/{derivativeurn}
     * endpoint. The statuses are used to verify whether the translation of requested output files is complete. Note that different
     * output files might complete their translation processes at different times, and therefore may have different `status` values.
     * When translating a source file a second time, the previously created manifest is not deleted; it appends the information
     * (only new translations) to the manifest.
     */
    getManifest(
        urn: string,
        opts: { acceptEncoding?: string },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Returns a list of model view (metadata) IDs for a design model. The metadata ID enables end users to select an object tree
     * and properties for a specific model view. Although most design apps (e.g., Fusion and Inventor) only allow a single model
     * view (object tree and set of properties), some apps (e.g., Revit) allow users to design models with multiple model views
     * (e.g., HVAC, architecture, perspective). Note that you can only retrieve metadata from an input file that has been
     * translated into an SVF file.
     */
    getMetadata(
        urn: string,
        opts: { acceptEncoding?: string },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Returns an object tree, i.e., a hierarchical list of objects for a model view. To call this endpoint you first need to
     * call the GET {urn}/metadata endpoint, to determine which model view (object tree and set of properties) to use. Although
     * most design apps (e.g., Fusion and Inventor) only allow a single model view, some apps (e.g., Revit) allow users to design
     * models with multiple model views (e.g., HVAC, architecture, perspective). Note that you can only retrieve metadata from an
     * input file that has been translated into an SVF file.
     */
    getModelviewMetadata(
        urn: string,
        guid: string,
        opts: { acceptEncoding?: string },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Returns a list of properties for each object in an object tree. Properties are returned according to object ID and do not
     * follow a hierarchical structure. The following image displays a typical list of properties for a Revit object: To call
     * this endpoint you need to first call the GET {urn}/metadata endpoint, which returns a list of model view (metadata) IDs
     * for a design input model. Select a model view (metadata) ID to use when calling the Get Properties endpoint. Note that
     * you can only get properties from a design input file that was previously translated into an SVF file.
     */
    getModelviewProperties(
        urn: string,
        guid: string,
        opts: { acceptEncoding?: string },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Returns the thumbnail for the source file.
     */
    getThumbnail(
        urn: string,
        opts: { width?: number; height?: number },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Translate a source file from one format to another. Derivatives are stored in a manifest that is updated each time this endpoint
     * is used on a source file. Note that this endpoint is asynchronous and initiates a process that runs in the background, rather
     * than keeping an open HTTP connection until completion. Use the GET {urn}/manifest endpoint to poll for the job’s completion.
     */
    translate(
        job: JobPayload,
        opts: { xAdsForce?: boolean },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;
}

export class EnginesApi {
    /**
     * Returns the details of all available AutoCAD core engines.
     */
    getAllEngines(oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * Returns the details of a specific AutoCAD core engine.
     */
    getEngine(id: string, oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;
}

export interface JsonApiVersionJsonapi {
    version: string;
}

export interface JsonApiLink {
    href: string;
}

export interface BaseAttributesExtensionObject {
    type: string;
    version: string;
    schema: JsonApiLink;
    data?: object;
}

export interface CreateFolderDataAttributesExtension {
    type: string;
    version: string;
    data?: object;
}

export interface CreateFolderDataAttributes {
    name: string;
    extension: BaseAttributesExtensionObject;
}

export interface CreateFolderDataRelationshipsParentData {
    type: string;
    id: string;
}

export interface CreateFolderDataRelationshipsParent {
    data: CreateFolderDataRelationshipsParentData;
}

export interface CreateFolderDataRelationships {
    parent: CreateFolderDataRelationshipsParent;
}

export interface CreateFolderData {
    type: string;
    attributes?: CreateFolderDataAttributes;
    relationships?: CreateFolderDataRelationships;
}

export interface CreateFolder {
    jsonapi?: JsonApiVersionJsonapi;
    data?: CreateFolderData;
}

export interface CreateRefDataMetaExtension {
    type: string;
    version: string;
    data?: object;
}

export interface CreateRefDataMeta {
    extension: BaseAttributesExtensionObject;
}

export interface CreateRefData {
    type: string;
    id: string;
    meta?: CreateRefDataMeta;
}

export interface CreateRef {
    jsonapi?: JsonApiVersionJsonapi;
    data?: CreateRefData;
}

export class FoldersApi {
    /**
     * Returns the folder by ID for any folder within a given project. All folders or sub-folders within a project
     * are associated with their own unique ID, including the root folder.
     */
    getFolder(
        projectId: string,
        folderId: string,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Returns a collection of items and folders within a folder. Items represent word documents, fusion design files, drawings, spreadsheets, etc.
     */
    getFolderContents(
        projectId: string,
        folderId: string,
        opts: {
            filterType?: string[];
            filterId?: string[];
            filterExtensionType?: string[];
            pageNumber?: number;
            pageLimit?: number;
        },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Returns the parent folder (if it exists). In a project, subfolders and resource items are stored under a folder except the root folder
     * which does not have a parent of its own.
     */
    getFolderParent(
        projectId: string,
        folderId: string,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Returns the resources (`items`, `folders`, and `versions`) which have a custom relationship with the given `folder_id`. Custom relationships
     * can be established between a folder and other resources within the 'data' domain service (folders, items, and versions).
     */
    getFolderRefs(
        projectId: string,
        folderId: string,
        opts: {
            filterType?: string[];
            filterId?: string[];
            filterExtensionType?: string[];
        },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Returns the custom relationships that are associated to the given `folder_id`. Custom relationships can be established between a folder and
     * other resources within the 'data' domain service (folders, items, and versions).
     */
    getFolderRelationshipsRefs(
        projectId: string,
        folderId: string,
        opts: {
            filterType?: string[];
            filterId?: string[];
            filterRefType?: string[];
            filterDirection?: string;
            filterExtensionType?: string[];
        },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Creates a new folder in the `data` domain service.
     */
    postFolder(
        projectId: string,
        body: CreateFolder,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Creates a custom relationship between a folder and another resource within the 'data' domain service (folder, item, or version).
     */
    postFolderRelationshipsRef(
        projectId: string,
        folderId: string,
        body: CreateRef,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;
}

export class HubsApi {
    /**
     * Returns data on a specific `hub_id`.
     */
    getHub(hubId: string, oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * Returns a collection of accessible hubs for this member. A Hub represents an A360 Team/Personal hub or a BIM 360 account.
     */
    getHubs(
        opts: { filterId?: string[]; filterExtensionType?: string[] },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;
}

export interface CreateStorageDataAttributes {
    name: string;
    extension: BaseAttributesExtensionObject;
}

export interface CreateItemDataRelationshipsTipData {
    type: string;
    id: string;
}

export interface CreateItemDataRelationshipsTip {
    data?: CreateItemDataRelationshipsTipData;
}

export interface StorageRelationshipsTargetData {
    type: string;
    id: string;
}

export interface CreateStorageDataRelationshipsTarget {
    data?: StorageRelationshipsTargetData;
}

export interface CreateItemDataRelationships {
    tip?: CreateItemDataRelationshipsTip;
    parent?: CreateStorageDataRelationshipsTarget;
}

export interface CreateItemData {
    type: string;
    attributes?: CreateStorageDataAttributes;
    relationships?: CreateItemDataRelationships;
}

export interface CreateItemRelationshipsStorageData {
    type: string;
    id: string;
}

export interface CreateItemRelationshipsStorage {
    data?: CreateItemRelationshipsStorageData;
}

export interface CreateItemRelationships {
    storage?: CreateItemRelationshipsStorage;
}

export interface CreateItemIncluded {
    type: string;
    id: string;
    attributes?: CreateStorageDataAttributes;
    relationships?: CreateItemRelationships;
}

export interface CreateItem {
    jsonapi?: JsonApiVersionJsonapi;
    data?: CreateItemData;
    included: CreateItemIncluded[];
}

export interface CreateRef {
    jsonapi?: JsonApiVersionJsonapi;
    data?: CreateRefData;
}

export class ItemsApi {
    /**
     * Returns a resource item by ID for any item within a given project. Resource items represent word documents, fusion design files, drawings, spreadsheets, etc.
     */
    getItem(projectId: string, itemId: string, oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * Returns the 'parent' folder for the given item.
     */
    getItemParentFolder(
        projectId: string,
        itemId: string,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Returns the resources (`items`, `folders`, and `versions`) which have a custom relationship with the given `item_id`. Custom relationships
     * can be established between an item and other resources within the 'data' domain service (folders, items, and versions).
     */
    getItemRefs(
        projectId: string,
        itemId: string,
        opts: { filterType?: string[]; filterId?: string[]; filterExtensionType?: string[] },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Returns the custom relationships that are associated to the given `item_id`. Custom relationships can be established between an item and
     * other resources within the 'data' domain service (folders, items, and versions).
     */
    getItemRelationshipsRefs(
        projectId: string,
        itemId: string,
        opts: {
            filterType?: string[];
            filterId?: string[];
            filterRefType?: string;
            filterDirection?: string;
            filterExtensionType?: string[];
        },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Returns the 'tip' version for the given item. Multiple versions of a resource item can be uploaded in a project. The tip version is the most recent one.
     */
    getItemTip(
        projectId: string,
        itemId: string,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Returns versions for the given item. Multiple versions of a resource item can be uploaded in a project.
     */
    getItemVersions(
        projectId: string,
        itemId: string,
        opts: {
            filterType?: string[];
            filterId?: string[];
            filterExtensionType?: string[];
            filterVersionNumber?: number[];
            pageNumber?: number;
            pageLimit?: number;
        },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Creates a new item in the 'data' domain service.
     */
    postItem(
        projectId: string,
        body: CreateItem,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Creates a custom relationship between an item and another resource within the 'data' domain service (folder, item, or version).
     */
    postItemRelationshipsRef(
        projectId: string,
        itemId: string,
        body: CreateRef,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;
}

export interface PostBucketsSigned {
    minutesExpiration: number;
}

export class ObjectsApi {
    /**
     * Copies an object to another object name in the same bucket.
     */
    copyTo(
        bucketKey: string,
        objectName: string,
        newObjName: string,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * This endpoint creates a signed URL that can be used to download an object within the specified expiration time. Be aware that
     * if the object the signed URL points to is deleted or expires before the signed URL expires, then the signed URL will no longer
     * be valid. A successful call to this endpoint requires bucket owner access.
     */
    createSignedResource(
        bucketKey: string,
        objectName: string,
        postBucketsSigned: PostBucketsSigned,
        access: string,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Deletes an object from the bucket.
     */
    deleteObject(
        bucketKey: string,
        objectName: string,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Delete a signed URL. A successful call to this endpoint requires bucket owner access.
     */
    deleteSignedResource(
        id: string,
        region: string,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Download an object.
     */
    deleteSignedResource(
        bucketKey: string,
        objectName: string,
        opts: { range?: string; ifNoneMatch?: string; ifModifiedSince?: Date; acceptEncoding?: string },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Returns object details in JSON format.
     */
    getObjectDetails(
        bucketKey: string,
        objectName: string,
        opts: { ifModifiedSince?: Date; _with?: string },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * List objects in a bucket. It is only available to the bucket creator.
     */
    getObjects(
        bucketKey: string,
        opts: { limit?: number; beginsWith?: string; startAt?: string },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Download an object using a signed URL.
     */
    getSignedResource(
        id: string,
        opts: {
            range?: string;
            ifNoneMatch?: string;
            ifModifiedSince?: string;
            acceptEncoding?: string;
            region?: string;
        },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * This endpoint returns status information about a resumable upload.
     */
    getStatusBySessionId(
        bucketKey: string,
        objectName: string,
        sessionId: string,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * This endpoint allows resumable uploads for large files in chunks.
     */
    uploadChunk(
        bucketKey: string,
        objectName: string,
        contentLength: number,
        contentRange: string,
        sessionId: string,
        body: string | Buffer,
        opts: { contentDisposition?: string; ifMatch?: string },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Upload an object. If the specified object name already exists in the bucket, the uploaded content will
     * overwrite the existing content for the bucket name/object name combination.
     */
    uploadObject(
        bucketKey: string,
        objectName: string,
        contentLength: number,
        body: string | Buffer,
        opts: { contentDisposition?: string; ifMatch?: string },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Overwrite a existing object using a signed URL. Conditions to call this operation: Object is available Expiration
     * period is valid Signed URL should be created with `write` or `readwrite`.
     */
    uploadSignedResource(
        id: string,
        contentLength: number,
        body: string | Buffer,
        opts: { contentDisposition?: string; xAdsRegion?: string; ifMatch?: string },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Resumable upload for signed URLs.
     */
    uploadSignedResourcesChunk(
        id: string,
        contentLength: number,
        sessionId: string,
        body: string | Buffer,
        opts: { contentDisposition?: string; ifMatch?: string },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;
}

export interface CreateStorageDataRelationships {
    target?: CreateStorageDataRelationshipsTarget;
}

export interface CreateStorageData {
    attributes?: CreateStorageDataAttributes;
    relationships?: CreateStorageDataRelationships;
}

export interface CreateStorage {
    jsonapi?: JsonApiVersionJsonapi;
    data?: CreateStorageData;
}

export class ProjectsApi {
    /**
     * Returns a collection of projects for a given `hub_id`. A project represents an A360 project or a BIM 360 project which
     * is set up under an A360 hub or BIM 360 account, respectively. Within a hub or an account, multiple projects can be
     * created to be used.
     */
    getHubProjects(
        hubId: string,
        opts: { filterId?: string[]; filterExtensionType?: string[] },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Returns a project for a given `project_id`.
     */
    getProject(
        hubId: string,
        projectId: string,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Returns the hub for a given `project_id`.
     */
    getProjectHub(
        hubId: string,
        projectId: string,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Returns the details of the highest level folders the user has access to for a given project.
     */
    getProjectTopFolders(
        hubId: string,
        projectId: string,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Creates a storage location in the OSS where data can be uploaded to.
     */
    postStorage(
        projectId: string,
        body: CreateStorage,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;
}

export class UserProfileApi {
    /**
     * Returns the profile information of an authorizing end user.
     */
    getUserProfile(oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;
}

export interface CreateVersionDataRelationshipsItemData {
    type: string;
    id: string;
}

export interface CreateVersionDataRelationshipsItem {
    data?: CreateVersionDataRelationshipsItemData;
}

export interface CreateVersionDataRelationships {
    item?: CreateVersionDataRelationshipsItem;
    storage?: CreateItemRelationshipsStorage;
}

export interface CreateVersionData {
    type: string;
    attributes?: CreateStorageDataAttributes;
    relationships?: CreateVersionDataRelationships;
}

export interface CreateVersion {
    jsonapi?: JsonApiVersionJsonapi;
    data?: CreateVersionData;
}

export class VersionsApi {
    /**
     * Returns the version with the given `version_id`.
     */
    getVersion(
        projectId: string,
        versionId: string,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Returns the item the given version is associated with.
     */
    getVersionItem(
        projectId: string,
        versionId: string,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Returns the resources (`items`, `folders`, and `versions`) which have a custom relationship with the given `version_id`.
     * Custom relationships can be established between a version of an item and other resources within the 'data' domain service
     * (folders, items, and versions).
     */
    getVersionRefs(
        projectId: string,
        versionId: string,
        opts: { filterType?: string[]; filterId?: string[]; filterExtensionType?: string[] },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Returns the custom relationships that are associated to the given `version_id`. Custom relationships can be established between
     * a version of an item and other resources within the 'data' domain service (folders, items, and versions).
     */
    getVersionRelationshipsRefs(
        projectId: string,
        versionId: string,
        opts: {
            filterType?: string[];
            filterId?: string[];
            filterRefType?: string[];
            filterDirection?: string;
            filterExtensionType?: string[];
        },
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Creates a new version of an item in the 'data' domain service.
     */
    postVersion(
        projectId: string,
        body: CreateVersion,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;

    /**
     * Creates a new version of an item in the 'data' domain service.
     */
    postVersionRelationshipsRef(
        projectId: string,
        versionId: string,
        body: CreateRef,
        oauth2Client: AuthClient,
        credentials: AuthToken,
    ): Promise<ApiResponse>;
}

export interface WorkItem {
    id: string;
    _arguments: object;
    status?: string;
    statusDetail?: object;
    availabilityZone?: string;
    activityId: string;
    version?: number;
    timestamp?: string;
}

export class WorkItemsApi {
    /**
     * Creates a new WorkItem.
     */
    createWorkItem(workItem: WorkItem, oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * Removes a specific WorkItem.
     */
    deleteWorkItem(id: string, oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * Returns the details of all WorkItems.
     */
    getAllWorkItems(skip: number, oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;

    /**
     * Returns the details of a specific WorkItem.
     */
    getWorkItem(id: string, oauth2Client: AuthClient, credentials: AuthToken): Promise<ApiResponse>;
}
