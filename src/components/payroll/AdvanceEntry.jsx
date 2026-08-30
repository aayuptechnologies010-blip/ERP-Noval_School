import React from 'react';

export default function AdvanceEntry() {
  return (
    <div style={{ padding: '20px', backgroundColor: 'white', minHeight: '800px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <h1 style={{ color: '#ff0000', margin: '0 0 15px 0', fontSize: '24px', fontWeight: 'normal' }}>
        Server Error in '/' Application.
      </h1>
      <hr style={{ border: 'none', borderTop: '1px solid #ccc', marginBottom: '15px' }} />
      <h2 style={{ color: '#800000', margin: '0 0 15px 0', fontSize: '18px', fontWeight: 'normal', fontStyle: 'italic' }}>
        Procedure or function 'PayGetStaffwithSI' expects parameter '@Active', which was not supplied.
      </h2>
      <p style={{ margin: '0 0 15px 0', fontSize: '13px' }}>
        <strong>Description: </strong>An unhandled exception occurred during the execution of the current web request. Please review the stack trace for more information about the error and where it originated in the code.
      </p>
      <p style={{ margin: '0 0 15px 0', fontSize: '13px' }}>
        <strong>Exception Details: </strong>System.Data.SqlClient.SqlException: Procedure or function 'PayGetStaffwithSI' expects parameter '@Active', which was not supplied.
      </p>
      <p style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 'bold' }}>Source Error:</p>
      <div style={{ backgroundColor: '#ffffcc', border: 'none', padding: '10px', marginBottom: '15px', fontFamily: 'Consolas, monospace', fontSize: '12px' }}>
        An unhandled exception was generated during the execution of the current web request. Information regarding the origin and location of the exception can be identified using the exception stack trace below.
      </div>
      
      <p style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 'bold' }}>Stack Trace:</p>
      <div style={{ backgroundColor: '#ffffcc', border: 'none', padding: '15px', marginBottom: '20px', fontFamily: 'Consolas, monospace', fontSize: '12px', whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>
[SqlException (0x80131904): Procedure or function 'PayGetStaffwithSI' expects parameter '@Active', which was not supplied.]
   System.Data.SqlClient.SqlConnection.OnError(SqlException exception, Boolean breakConnection, Action`1 wrapCloseInAction) +3335312
   System.Data.SqlClient.TdsParser.ThrowExceptionAndWarning(TdsParserStateObject stateObj, Boolean callerHasConnectionLock, Boolean asyncClose) +334
   System.Data.SqlClient.TdsParser.TryRun(RunBehavior runBehavior, SqlCommand cmdHandler, SqlDataReader dataStream, BulkCopySimpleResultSet bulkCopyHandler, TdsParserStateObject stateObj, Boolean& dataReady) +89
   System.Data.SqlClient.SqlDataReader.TryConsumeMetaData() +101
   System.Data.SqlClient.SqlDataReader.get_MetaData() +101
   System.Data.SqlClient.SqlCommand.FinishExecuteReader(SqlDataReader ds, RunBehavior runBehavior, String resetOptionsString, Boolean isInternal, Boolean forDescribeParameterEncryption, Boolean shouldCacheForAlwaysEncrypted) +538
   System.Data.SqlClient.SqlCommand.RunExecuteReaderTds(CommandBehavior cmdBehavior, RunBehavior runBehavior, Boolean returnStream, Boolean async, Int32 timeout, Task& task, Boolean asyncWrite, Boolean inRetry, SqlDataReader ds, Boolean describeParameterEncryptionRequest) +312
   System.Data.SqlClient.SqlCommand.RunExecuteReader(CommandBehavior cmdBehavior, RunBehavior runBehavior, Boolean returnStream, String method, TaskCompletionSource`1 completion, Int32 timeout, Task& task, Boolean& usedCache, Boolean asyncWrite, Boolean inRetry) +84
   System.Data.SqlClient.SqlCommand.ExecuteReader(CommandBehavior behavior, String method) +312
   System.Data.Common.DbDataAdapter.FillInternal(DataSet dataset, DataTable[] datatables, Int32 startRecord, Int32 maxRecords, String srcTable, IDbCommand command, CommandBehavior behavior) +465
   System.Data.Common.DbDataAdapter.Fill(DataTable[] dataTables, Int32 startRecord, Int32 maxRecords, IDbCommand command, CommandBehavior behavior) +465
   System.Data.Common.DbDataAdapter.Fill(DataTable dataTable) +147
   Utility.eCareERP.Utilities.UserAdo.GetDataTable(String _procedureName, SqlParameter[] _Parameters) +538
   PayRoll.eCareERP.PayAdvance.GetStaffwithstafftype(Int32 staffid) +275
   eCareERP.Payroll.PayAdvanceEntry.bindddlemp(Int32 staffid) +141
   eCareERP.Payroll.PayAdvanceEntry.Loaddropdown() +40
   eCareERP.Payroll.PayAdvanceEntry.Page_Load(Object sender, EventArgs e) +236
   System.Web.UI.Control.OnLoad(EventArgs e) +108
   System.Web.UI.Control.LoadRecursive() +90
   System.Web.UI.Page.ProcessRequestMain(Boolean includeStagesBeforeAsyncPoint, Boolean includeStagesAfterAsyncPoint) +1533
      </div>
      
      <hr style={{ border: 'none', borderTop: '1px solid #ccc', marginBottom: '10px' }} />
      <p style={{ margin: '0', fontSize: '11px', color: '#666' }}>
        <strong>Version Information:</strong> Microsoft .NET Framework Version:4.0.30319; ASP.NET Version:4.8.4805.0
      </p>
    </div>
  );
}
