export default async function GroupParticipants(Matrix, { id, participants, action }) {
   try {
      const metadata = await Matrix.groupMetadata(id)

      // participants
      for (const jid of participants) {
         // get profile picture user
         let profile
         try {
            profile = await Matrix.profilePictureUrl(jid, "image")
         } catch {
            profile = "https://lh3.googleusercontent.com/proxy/esjjzRYoXlhgNYXqU8Gf_3lu6V-eONTnymkLzdwQ6F6z0MWAqIwIpqgq_lk4caRIZF_0Uqb5U8NWNrJcaeTuCjp7xZlpL48JDx-qzAXSTh00AVVqBoT7MJ0259pik9mnQ1LldFLfHZUGDGY=w1200-h630-p-k-no-nu"
         }

         // action
         if (action == "add") {
            Matrix.sendMessage(id, {
               text: `Welcome @${jid.split("@")[0]} to "${metadata.subject}"`, contextInfo: {
                  mentionedJid: [jid],
                  externalAdReply: {
                     title: `Welcome`,
                     mediaType: 1,
                     previewType: 0,
                     renderLargerThumbnail: true,
                     thumbnailUrl: profile,
                     sourceUrl: 'https://matrixcoder.vercel.app'
                  }
               }
            })
         } else if (action == "remove") {
            Matrix.sendMessage(id, {
               text: `@${jid.split("@")[0]} Leaving From "${metadata.subject}"`, contextInfo: {
                  mentionedJid: [jid],
                  externalAdReply: {
                     title: `Leave`,
                     mediaType: 1,
                     previewType: 0,
                     renderLargerThumbnail: true,
                     thumbnailUrl: profile,
                     sourceUrl: 'https://matrixcoder.vercel.app'
                  }
               }
            })
         }
      }
   } catch (e) {
      throw e
   }
}