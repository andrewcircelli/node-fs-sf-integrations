// Caller Functions to Express Server
const getSalesforceAccounts = async (req, res) => {
  const { data } = await axios.get("/api/accounts");
  console.log(data.records);
  showOutput(data);
};
// Event Listeners
document
  .getElementById("accounts")
  .addEventListener("click", getSalesforceAccounts);

// Show Output in Browser
function showOutput(res) {
  // don't love this but could need to look into why try , catch on axios call isn't capturing err in catch
  if (res.err)
    return (document.getElementById("res").innerHTML = `${JSON.stringify(
      res.err,
      null,
      2
    )}`);
  {
    document.getElementById("res").innerHTML = `
    <div>
      <div class="card card-body mb-4">
        <h5>Status is done: ${res.done}</h5>
      </div>
      <div class="card card-body mb-4">
      <h5>Total records: ${res.totalSize}</h5>
    </div>
      <div class="card mt-3">
        <div class="card-header">
          Data
        </div>
        <div class="card-body">
          <pre>${JSON.stringify(res.records, null, 2)}</pre>
        </div>
      </div>
    </div>
  `;
  }
}
