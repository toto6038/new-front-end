<script setup lang="ts">
const members = [
  {
    displayedName: "HIDDEN",
    md5: "fdc6e7701498a88b7bac02c80a9057e7",
    role: 2,
    username: "40521208L",
  },
  {
    displayedName: "HIDDEN",
    md5: "08e1658db6219a2e478eab75f594829c",
    role: 2,
    username: "40523126l",
  },
  {
    displayedName: "HIDDEN",
    md5: "4dae0195a700a5a5725e8e86710ebc43",
    role: 2,
    username: "40544019S",
  },
  {
    displayedName: "HIDDEN",
    md5: "fc320a3f24cca0333cbf3370cca8ce1f",
    role: 2,
    username: "40547022S",
  },
  {
    displayedName: "HIDDEN",
    md5: "9fae00c1a814de0b5862381f1b216c53",
    role: 2,
    username: "40640119S",
  },
  {
    displayedName: "HIDDEN",
    md5: "f136f59fe4b21794af12639d3e04ac00",
    role: 2,
    username: "40640226S",
  },
  {
    displayedName: "HIDDEN",
    md5: "11c38cc2eed22b51051460a958ff11ed",
    role: 2,
    username: "40640301S",
  },
  {
    displayedName: "HIDDEN",
    md5: "0a9d2fdbb0f5dcbe0321dcaad1a2203e",
    role: 2,
    username: "40641213S",
  },
  {
    displayedName: "HIDDEN",
    md5: "aee4e0d7e76b24413747af2c8614269f",
    role: 2,
    username: "40641219S",
  },
  {
    displayedName: "HIDDEN",
    md5: "c2e0c237d32ef94db664620ce0dde7d3",
    role: 2,
    username: "40647005S",
  },
  {
    displayedName: "HIDDEN",
    md5: "a565837b81d2905f0935d1ec3373d431",
    role: 2,
    username: "40647039S",
  },
  {
    displayedName: "HIDDEN",
    md5: "fc5cd08ef208bf3690ef1ffa24c293d3",
    role: 2,
    username: "40647049S",
  },
  {
    displayedName: "HIDDEN",
    md5: "971301762ffc216992019eacec9cc28a",
    role: 2,
    username: "40671219h",
  },
  {
    displayedName: "HIDDEN",
    md5: "cf940bd8290c0bb0c9ec6f768557bd2b",
    role: 2,
    username: "40675029H",
  },
  {
    displayedName: "HIDDEN",
    md5: "02839530d7b4cd3cf53f862799850921",
    role: 2,
    username: "40711013E",
  },
  {
    displayedName: "HIDDEN",
    md5: "c4aa29ccfb4acc4bf0203fab50baff7b",
    role: 2,
    username: "40711017e",
  },
  {
    displayedName: "HIDDEN",
    md5: "d69f700088f50f4cf3723349f87ea3c6",
    role: 2,
    username: "40740126S",
  },
  {
    displayedName: "HIDDEN",
    md5: "20a7a4c662dbeec1b15dc0b67595f152",
    role: 2,
    username: "40740208S",
  },
  {
    displayedName: "HIDDEN",
    md5: "6cba104743bb106027fdf6eca7f49c8d",
    role: 2,
    username: "40740324S",
  },
  {
    displayedName: "HIDDEN",
    md5: "4588a9800b6e8ab31ae2f690c5f97a81",
    role: 2,
    username: "40744020S",
  },
  {
    displayedName: "HIDDEN",
    md5: "3b71eea5cc64889b15b9dccf037a67cd",
    role: 2,
    username: "40747001S",
  },
  {
    displayedName: "HIDDEN",
    md5: "b2cdc80a72c54e61b370b175ebc40984",
    role: 2,
    username: "40747005S",
  },
  {
    displayedName: "HIDDEN",
    md5: "7b0b2a77207bcad61f7fea6e545ef375",
    role: 2,
    username: "40747014S",
  },
  {
    displayedName: "HIDDEN",
    md5: "5ea39000a7107f3837f5b3bf893c094d",
    role: 2,
    username: "40747015S",
  },
  {
    displayedName: "HIDDEN",
    md5: "16671bc5ed41cb10dfc8c1ec4c7a86dd",
    role: 2,
    username: "40747038S",
  },
  {
    displayedName: "HIDDEN",
    md5: "5f78329baaee202f7d6892edd91f75fa",
    role: 2,
    username: "40757043O",
  },
  { displayedName: "HIDDEN", md5: "a43214b8a868334100d69c028f9ed0fb", role: 2, username: "40771105H" },
  {
    displayedName: "HIDDEN",
    md5: "4aed19b3a7afb8638197bb8e63079378",
    role: 2,
    username: "40771228H",
  },
  {
    displayedName: "HIDDEN",
    md5: "da8220660c98b2e2899def0461749150",
    role: 2,
    username: "40811007E",
  },
  {
    displayedName: "HIDDEN",
    md5: "4b8bd6dded0bf011d311492e61d1e0db",
    role: 2,
    username: "40841219s",
  },
  {
    displayedName: "HIDDEN",
    md5: "bd96fdc4c1e9df64982fda49855b2e4f",
    role: 2,
    username: "40847001S",
  },
  {
    displayedName: "HIDDEN",
    md5: "376aa461c19a94dd8a894d1643099479",
    role: 2,
    username: "40847002S",
  },
  {
    displayedName: "HIDDEN",
    md5: "52658355e889812569ca4d9feee2476c",
    role: 2,
    username: "40847003S",
  },
  {
    displayedName: "HIDDEN",
    md5: "23c8c6296d404afca600eb72af462ee0",
    role: 2,
    username: "40847004S",
  },
  {
    displayedName: "HIDDEN",
    md5: "5a1eaa947fb125faaf06f9dac4dacbdf",
    role: 2,
    username: "40847005S",
  },
  {
    displayedName: "HIDDEN",
    md5: "ddc082a74e3ff7486db84540dca3e512",
    role: 2,
    username: "40847009S",
  },
  {
    displayedName: "HIDDEN",
    md5: "ba97686c2c2014109b74d90c2a9172b5",
    role: 2,
    username: "40847010S",
  },
  {
    displayedName: "HIDDEN",
    md5: "c11d47bfd8fadda5aaf042c87c6eb1f1",
    role: 2,
    username: "40847012S",
  },
  {
    displayedName: "HIDDEN",
    md5: "e01a78d6fcb9219fc3926484fd738993",
    role: 2,
    username: "40847014S",
  },
  {
    displayedName: "HIDDEN",
    md5: "1c394610200d4c1b9d0a0e9394eb2d21",
    role: 2,
    username: "40847015S",
  },
  {
    displayedName: "HIDDEN",
    md5: "4c52eba96f6314e14f23373d650d5486",
    role: 2,
    username: "40847016S",
  },
  {
    displayedName: "HIDDEN",
    md5: "9fc19c580cdcca8dae37b9c6bfb09e9a",
    role: 2,
    username: "40847017S",
  },
  {
    displayedName: "HIDDEN",
    md5: "38768019224eb9db23b8418f235c7aae",
    role: 2,
    username: "40847020S",
  },
  {
    displayedName: "HIDDEN",
    md5: "a863d2e2601a06d8e5dcd414922c0212",
    role: 2,
    username: "40847021S",
  },
  {
    displayedName: "HIDDEN",
    md5: "8481044079bd03b78e882358f4713586",
    role: 2,
    username: "40847022S",
  },
  {
    displayedName: "HIDDEN",
    md5: "75a5f13189bf3cb8412128119f8a3dd6",
    role: 2,
    username: "40847023S",
  },
  {
    displayedName: "HIDDEN",
    md5: "0734fd3833eeaae54810a6673bef2763",
    role: 2,
    username: "40847027S",
  },
  {
    displayedName: "HIDDEN",
    md5: "bfa80efff0da14ca97db5b1e0b42b343",
    role: 2,
    username: "40847028S",
  },
  {
    displayedName: "HIDDEN",
    md5: "89c5a892a4f7594c9df8b46c7ddc77b5",
    role: 2,
    username: "40847030S",
  },
  {
    displayedName: "HIDDEN",
    md5: "7654319287d48e49769a01a0367d3a4e",
    role: 2,
    username: "40847031S",
  },
  {
    displayedName: "HIDDEN",
    md5: "f75988159e59b2fb33cda5ec73f75392",
    role: 2,
    username: "40847033S",
  },
  {
    displayedName: "HIDDEN",
    md5: "63f5f61c827d2cea9d6ff7a479c6ccef",
    role: 2,
    username: "40847034S",
  },
  {
    displayedName: "HIDDEN",
    md5: "63c87849566139f2840f84827411d9b9",
    role: 2,
    username: "40847035S",
  },
  {
    displayedName: "HIDDEN",
    md5: "90716e36c5fd5f5c45c0321025b5943d",
    role: 2,
    username: "40847036S",
  },
  {
    displayedName: "HIDDEN",
    md5: "8d832c342d238d2ca5d75e0177df4faa",
    role: 2,
    username: "40847037S",
  },
  {
    displayedName: "HIDDEN",
    md5: "58a192eb99054cbe5d2cff0af676280b",
    role: 2,
    username: "40847038S",
  },
  {
    displayedName: "HIDDEN",
    md5: "3776d3f4d683c2a6a7eb21e70e1aab9c",
    role: 2,
    username: "40847041S",
  },
  {
    displayedName: "HIDDEN",
    md5: "08a154f734be60140ff06d9c4d3f6d63",
    role: 2,
    username: "40847044S",
  },
  {
    displayedName: "HIDDEN",
    md5: "79463f365efe49d9de30e482edbf79b0",
    role: 2,
    username: "40847056S",
  },
  {
    displayedName: "HIDDEN",
    md5: "988ff420d57e3e677882b677c25ff0d3",
    role: 2,
    username: "40847057S",
  },
  {
    displayedName: "HIDDEN",
    md5: "42d0ffb6d918fa6882f493669c76b604",
    role: 2,
    username: "40871211h",
  },
  { displayedName: "HIDDEN", md5: "38632795a9dafcde593ad730a9c9c7fd", role: 2, username: "40871231H" },
  {
    displayedName: "HIDDEN",
    md5: "3fb4dc4da396c80d52a0e25fce5d4bf1",
    role: 2,
    username: "40871904h",
  },
  {
    displayedName: "HIDDEN",
    md5: "aad5dee35269b5ddebe28d9d2d3c39bd",
    role: 2,
    username: "40872030H",
  },
  {
    displayedName: "HIDDEN",
    md5: "c5df49c1ba40d8a8e6934f36185777a9",
    role: 2,
    username: "40873027H",
  },
  {
    displayedName: "HIDDEN",
    md5: "7f4538532b623a050663cd1fb94b00dc",
    role: 2,
    username: "40947030S",
  },
  {
    displayedName: "HIDDEN",
    md5: "027c85d32010796c7ad342d4648adb81",
    role: 2,
    username: "40947031S",
  },
  {
    displayedName: "HIDDEN",
    md5: "1728b121ba304974b32d036b0f6723be",
    role: 2,
    username: "40947069S",
  },
  {
    displayedName: "HIDDEN",
    md5: "35cc9dae24d8715afc877e72838a5837",
    role: 2,
    username: "40947072S",
  },
  { displayedName: "HIDDEN", md5: "5d343adc30eec1ca1385f10b59847375", role: 2, username: "40947075S" },
  { displayedName: "HIDDEN", md5: "d1189e2842a272f6f2ed118c903e209b", role: 2, username: "40947903S" },
  {
    displayedName: "HIDDEN",
    md5: "b69565cc55d52b53854e1824fce46619",
    role: 2,
    username: "60608008E",
  },
  {
    displayedName: "HIDDEN",
    md5: "ccafe43dc094b1a61c639b4cb905f1e1",
    role: 2,
    username: "60808012E",
  },
  { displayedName: "HIDDEN", md: "ccafe43dc094b1a61c639b4cb905f1e1", role: 2, username: "60808020E" },
  {
    displayedName: "HIDDEN",
    md5: "6877cfe01ffa808e9dd2a807c5643b8a",
    role: 2,
    username: "60808023E",
  },
  {
    displayedName: "HIDDEN",
    md5: "dd22d628169f89034cb2a938c0a4940f",
    role: 2,
    username: "90999203Y",
  },
  {
    displayedName: "HIDDEN",
    md5: "54e122ffc742acb49ad735be7f49ac3a",
    role: 2,
    username: "90999228Y",
  },
  {
    displayedName: "HIDDEN",
    md5: "fa7eb5ece60511c46581037e2c4f97d9",
    role: 0,
    username: "TA_TzuHao_Hsu",
  },
  {
    displayedName: "HIDDEN",
    md5: "c222b446affb0f9262a45d2e73fd714f",
    role: 0,
    username: "TA_TzuWei_Yu",
  },
  {
    displayedName: "HIDDEN",
    md5: "770382cd812bea3110839c82d9daa112",
    role: 0,
    username: "TA_YuJie_Siao",
  },
];
</script>

<template>
  <div class="card-container">
    <div class="card min-w-full">
      <div class="card-body">
        <h2 class="card-title">Member List</h2>

        <div class="mt-8 overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>username</th>
                <th>display name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="{ username, displayedName } in members" :key="username" class="hover">
                <td>{{ username }}</td>
                <td>{{ displayedName }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
