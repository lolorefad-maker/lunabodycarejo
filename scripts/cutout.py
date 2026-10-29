# Cuts the products out of the source photos (rembg, local models only).
import os, sys
from PIL import Image
os.environ.setdefault("U2NET_HOME", os.path.expanduser("~/.rembg/models/" + sys.argv[1]))
from rembg import new_session, remove

model, src, out = sys.argv[1], sys.argv[2], sys.argv[3]
session = new_session(model)
im = Image.open(src).convert("RGB")
res = remove(im, session=session, post_process_mask=True)
res.save(out)
print("saved", out, res.size)
